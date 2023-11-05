import { LogoLong } from '~/components/Logos';
import { CommandMenu } from '~/components/MainNavbar/CommandMenu';
import { MainNav } from '~/components/MainNavbar/MainNav';
import { ThemeButton } from '~/components/MainNavbar/ThemeButton';
import { UserNav } from '~/components/MainNavbar/UserNav';

export default function MainNavbar() {
  return (
    <div className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur'>
      <div className='flex h-16 items-center px-4'>
        <LogoLong width={25} height={25} />
        <span className='ml-2 hidden font-bold sm:inline-block'>
          ESNext/Dev
        </span>
        <MainNav className='mx-6' />
        <div className='ml-auto flex items-center space-x-4'>
          <CommandMenu />
          <ThemeButton />
          <UserNav />
        </div>
      </div>
    </div>
  );
}
