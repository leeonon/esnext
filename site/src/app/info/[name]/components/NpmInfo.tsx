import type { ProjectDetailType } from '@esnext/server';
import type { FC } from 'react';

import dayjs from 'dayjs';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

export type NpmInfoProps = {
  project?: ProjectDetailType;
};

const NpmInfo: FC<NpmInfoProps> = ({ project }) => {
  if (!project) {
    return null;
  }

  return (
    <Card className='bg-accent h-fit'>
      <CardHeader>
        <CardTitle className='uppercase'>NPM</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-2 text-sm'>
          <div className='flex items-center gap-2'>
            <span>Link:</span>
            <a
              href={`https://www.npmjs.com/package/${project.name.toLocaleLowerCase()}`}
              target='_blank'
              className='m-0 h-auto p-0 text-blue-400 underline'
              rel='noreferrer'
            >
              {project.name}
            </a>
          </div>
          <div className='flex items-center gap-2'>
            <span>Latest version:</span>
            <span className='text-muted-foreground'>v{project.version}</span>
          </div>
          <div className='flex items-center gap-2'>
            <span>Last publish:</span>
            <span className='text-muted-foreground'>
              {dayjs(project.modified).format('YYYY-MM-DD')}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <span>License:</span>
            <span className='text-muted-foreground'>{project.licenseName}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NpmInfo;
