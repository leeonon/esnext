import type { Metadata } from "next";

import ProjectInfo from "./client";

type Props = {
  params: { name: string };
  searchParams: Record<string, string | string[] | undefined>;
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  console.log("🚀 ~ file: page.tsx:20 ~ params:", params, searchParams);
  return Promise.resolve({
    title: `ESNext - ${params.name}`,
  });
}

export default function Page() {
  return <ProjectInfo />;
}
