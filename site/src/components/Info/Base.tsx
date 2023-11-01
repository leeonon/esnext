import NextImage from 'next/image';
import { Icon } from '@iconify/react';
import { Button, Image } from '@nextui-org/react';

import { useProjectInfoContext } from '~/app/info/[name]/context';
import CollectionButton from '~/components/Info/Favorites';

export default function ProjectBaseInfo() {
  const { project } = useProjectInfoContext();

  if (!project) {
    return null;
  }

  return (
    <div className='border-b-1 border-default-50 flex items-center justify-between pb-3'>
      <div className='flex flex-col'>
        <div className='flex items-center gap-4'>
          <div className='shadow-default-100 overflow-hidden rounded-sm shadow-[0_1px_4px_0px]'>
            <Image
              as={NextImage}
              isBlurred
              width={70}
              height={70}
              radius='lg'
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
        <div className='text-default-500 pt-2 text-sm'>
          {project.description}
        </div>
      </div>
      <div className='flex items-center gap-3'>
        <CollectionButton />
        <Button
          startContent={<Icon icon='mdi:github' fontSize={22} />}
          radius='sm'
          size='md'
        >
          View on Github
        </Button>
        <Button
          startContent={<Icon icon='tabler:home' fontSize={22} />}
          radius='sm'
          size='md'
        >
          Visit Website
        </Button>
      </div>
    </div>
  );
}
