import startCase from 'lodash/startCase';
import Link from 'next/link';

import UserLayoutTitle from '~/app/user/components/Title';
import ProjectList from '~/app/user/favorites/[name]/components/List';
import { api } from '~/trpc/server';

type PageProps = {
  params: { name: string };
};

export default async function Page({ params: { name } }: PageProps) {
  const _name = decodeURIComponent(name);
  const detail = await api.favorites.detail.query(_name);
  return (
    <div>
      <UserLayoutTitle
        title={
          <div>
            <span className='flex items-center text-2xl'>
              <Link href='/user/favorites' className='text-default-500'>
                Favorites&nbsp;/&nbsp;
              </Link>
              <span className='text-default-900'>{startCase(detail.name)}</span>
            </span>
            <span className='ml-2 text-xs text-default-400'>
              共{detail.projects.length}个项目
            </span>
          </div>
        }
      />
      <p className='mt-2 text-xs text-default-400'>{detail.description}</p>
      <ProjectList list={detail.projects} />
    </div>
  );
}
