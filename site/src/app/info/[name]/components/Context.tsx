'use client';

import type { ProjectDetailType } from '@esnext/server';
import type { FC, PropsWithChildren } from 'react';

import { useMemo } from 'react';

import { ProjectInfoContext } from '~/app/info/[name]/context';

const InfoContext: FC<PropsWithChildren<{ project: ProjectDetailType }>> = ({
  children,
  project,
}) => {
  const contextValue = useMemo(() => {
    return {
      project,
      onRefresh: () => {
        alert('refresh');
      },
    };
  }, [project]);

  return (
    <ProjectInfoContext.Provider value={contextValue}>
      {children}
    </ProjectInfoContext.Provider>
  );
};
export default InfoContext;
