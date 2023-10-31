import Link from 'next/link';
import startCase from 'lodash/startCase';

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
            <span className='text-default-400 ml-2 text-xs'>
              共{detail.projects.length}个项目
            </span>
          </div>
        }
      />
      <p className='text-default-400 mt-2 text-xs'>{detail.description}</p>
      <ProjectList list={detail.projects} />
    </div>
  );
}
