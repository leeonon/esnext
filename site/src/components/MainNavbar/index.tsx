import { LogoLong } from '~/components/Logos';
import { MainNav } from '~/components/MainNavbar/MainNav';
import { Search } from '~/components/MainNavbar/Search';
import { ThemeButton } from '~/components/MainNavbar/ThemeButton';
import { UserNav } from '~/components/MainNavbar/UserNav';

export default function MainNavbar() {
  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <LogoLong width={25} height={25} />
        <span className='ml-2 hidden font-bold sm:inline-block'>
          ESNext/Dev
        </span>
        <MainNav className='mx-6' />
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeButton />
          <UserNav />
        </div>
      </div>
    </div>
  );
}
