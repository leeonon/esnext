'use client';

import { Icon } from '@iconify/react';
import { useTheme } from 'next-themes';

import { Button } from '~/components/ui/button';

export function ThemeButton() {
  const { theme, setTheme } = useTheme();

  const switchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const onSwitchButton = () => {
    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => void;
    };
    // Chrome 111+
    if (!doc.startViewTransition) {
      switchTheme();
      return;
    }
    doc.startViewTransition(switchTheme);
  };

  return (
    <Button
      variant='ghost'
      size='icon'
      className='flex h-[36px] w-[36px] items-center justify-center'
      onClick={onSwitchButton}
    >
      {theme === 'dark' ? (
        <Icon
          fontSize={26}
          className='text-yellow-400'
          icon='line-md:moon-filled-to-sunny-filled-loop-transition'
        />
      ) : (
        <Icon
          fontSize={26}
          className='text-slate-800'
          icon='line-md:moon-filled-alt-loop'
        />
      )}
    </Button>
  );
}
