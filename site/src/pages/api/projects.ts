import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "~/server/db";

interface Project {
  id: number;
  name: string;
  fullName: string;
  description: string;
  homePage: string | null;
  stars: number;
  projectCreateTime: Date | null;
  lastCommitTime: Date | null;
  version: string | null;
  versionUpdateTime: Date | null;
  readme: string | null;
  logo: string | null;
  owner: string | null;
}

interface ApiResponse {
  success: boolean;
  data: Project[] | null;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>,
): Promise<void> {
  if (req.method !== "GET") {
    res
      .status(405)
      .json({ success: false, data: null, message: "Method Not Allowed" });
    return;
  }

  const projects = await db.project.findMany();

  res.status(200).json({ success: true, data: projects });
}
