import Image from 'next/image';
import { Icon } from '@iconify/react';

import CollectionButton from '~/app/info/[name]/components/Favorites';
import { useProjectInfoContext } from '~/app/info/[name]/context';
import { Button } from '~/components/ui/button';
import dayjs from '~/lib/dayjs';
import { num2k } from '~/lib/utils';

export default function ProjectBaseInfo() {
  const { project } = useProjectInfoContext();

  if (!project) {
    return null;
  }

  return (
    <div className='flex items-center justify-between border-b-[1px] pb-3'>
      <div className='flex flex-col'>
        <div className='flex items-center gap-4'>
          <div className='overflow-hidden rounded-sm '>
            <Image
              width={70}
              height={70}
              className='projectBoxImage rounded-md'
              src={project.ownerAvatarUrl}
              alt={project.name}
            />
          </div>
          <div>
            <div className='text-2xl font-bold'>{project.name}</div>
            <div className=''>{project.fullName}</div>
            <div className='mt-auto flex gap-2'>
              <div>
                <span className='mr-1 text-sm font-bold'>
                  {num2k(project.stargazersCount)}
                </span>
                <span className='text-xs'>Star</span>
              </div>
              <div>
                <span className='mr-1 text-sm font-bold'>
                  {Number(project.weeklyDownloads).toLocaleString()}
                </span>
                <span className='text-xs'>Weekly Downloads</span>
              </div>
              <div>
                <span className='mr-1 text-sm'>
                  Created by {dayjs(project.createdAt).fromNow()}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='text-muted-foreground pt-2 text-sm'>
          {project.description}
        </div>
      </div>
      <div className='flex items-center gap-3'>
        <CollectionButton />
        <Button>
          <Icon icon='mdi:github' fontSize={22} />
          View on Github
        </Button>
        <Button>
          <Icon icon='tabler:home' fontSize={22} />
          Visit Website
        </Button>
      </div>
    </div>
  );
}
