'use client';

import type { Dispatch, SetStateAction } from 'react';

import { createContext, useContext } from 'react';

export type LayoutType = 'grid' | 'list';

export type ProjectsList = {
  layout: LayoutType;
  onChangeParams: (name: string, value: string, isDelete?: boolean) => void;
  onChangeLayout?: Dispatch<SetStateAction<LayoutType>>;
};

export const ProjectsListContext = createContext<ProjectsList>({
  layout: 'list',
  onChangeParams: () => void 0,
});

export const useProjectsListContext = () => {
  const context = useContext(ProjectsListContext);
  if (!context) {
    throw new Error('projects list context error');
  }

  return context;
};
0;
