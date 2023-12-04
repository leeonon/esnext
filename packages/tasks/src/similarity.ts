import { db } from '@esnext/db';
import chalk from 'chalk';

export async function queryAllProjects() {
  const projects = await db.project.findMany({
    select: {
      id: true,
      name: true,
      categories: true,
      topics: true,
    },
  });
  return projects;
}

type ProjectItem = Awaited<ReturnType<typeof queryAllProjects>>[number];

export function calculateCategorySimilarity(
  project1: ProjectItem,
  project2: ProjectItem,
) {
  const categories1 = project1.categories.map((category) => category);
  const categories2 = project2.categories.map((category) => category);

  const set1 = new Set(categories1);
  const set2 = new Set(categories2);

  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  return intersection.size / (set1.size + set2.size - intersection.size);
}

export function calculateTopicSimilarity(
  project1: ProjectItem,
  project2: ProjectItem,
) {
  const topics1 = project1.topics?.split(',') ?? [];
  const topics2 = project2.topics?.split(',') ?? [];

  const set1 = new Set(topics1);
  const set2 = new Set(topics2);

  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  return intersection.size / (set1.size + set2.size - intersection.size);
}

export function calculateOverallSimilarity(
  project1: ProjectItem,
  project2: ProjectItem,
) {
  const categorySimilarity = calculateCategorySimilarity(project1, project2);
  const topicSimilarity = calculateTopicSimilarity(project1, project2);
  return Number(((categorySimilarity + topicSimilarity) / 2).toFixed(3));
}

export function saveProjectSimilarity(
  similarities: Array<{
    project1Id: number;
    project2Id: number;
    similarityScore: number;
  }>,
) {
  return db.projectSimilarity.createMany({
    data: similarities,
    skipDuplicates: true,
  });
}

export async function init() {
  const projects = await queryAllProjects();

  for (let i = 0; i < projects.length; i++) {
    const similarities = [];

    const project1 = projects[i];
    if (!project1) {
      continue;
    }
    for (let j = i + 1; j < projects.length; j++) {
      const project2 = projects[j];
      if (!project2) {
        continue;
      }
      const similarity = calculateOverallSimilarity(project1, project2);
      if (similarity > 0) {
        similarities.push({
          project1Id: project1.id,
          project2Id: project2.id,
          similarityScore: similarity,
        });
      }
    }
    await saveProjectSimilarity(similarities);

    chalk.green(`Done ${project1.name}------${projects.length}`);
  }
}
