import Image from 'next/image';
import { Icon } from '@iconify/react';

import CollectionButton from '~/app/info/[name]/components/Favorites';
import { useProjectInfoContext } from '~/app/info/[name]/context';
import { Button } from '~/components/ui/button';

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
              className='projectBoxImage'
              src='https://lee-oss-1300118632.cos.ap-nanjing.myqcloud.com/obsidian/202310091757604.jpg'
              alt=''
            />
          </div>
          <div>
            <div className='text-2xl font-bold'>{project.name}</div>
            <div className='text-default-500'>{project.fullName}</div>
            <div className='mt-auto flex gap-2'>
              <div>
                <span className='text-default-600 mr-1 text-sm font-bold'>
                  {project.stars}K
                </span>
                <span className='text-default-400 text-xs'>Star</span>
              </div>
              <div>
                <span className='text-default-600 mr-1 text-sm font-bold'>
                  124k
                </span>
                <span className='text-default-400 text-xs'>Download/week</span>
              </div>
              <div>
                <span className='text-default-600 mr-1 text-sm font-bold'>
                  89
                </span>
                <span className='text-default-400 text-xs'>Contributors</span>
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
