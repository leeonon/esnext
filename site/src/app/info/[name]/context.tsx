'use client';

import type { ProjectDetailType } from '@esnext/server';

import { createContext, useContext } from 'react';

export type ProjectInfoContextType = {
  project: ProjectDetailType | undefined;
  onRefresh: () => void;
};
export const ProjectInfoContext = createContext<ProjectInfoContextType | null>(
  null,
);

export const useProjectInfoContext = () => {
  const context = useContext(ProjectInfoContext);
  if (!context) {
    throw new Error('project info context error');
  }

  return context;
};
