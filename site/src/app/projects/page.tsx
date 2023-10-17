import type { Metadata } from "next";

import ProjectPage from "./client";

export const metadata: Metadata = {
  title: "ESNext - Projects",
};

export default function Page() {
  return <ProjectPage />;
}
