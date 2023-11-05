'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { type DialogProps } from '@radix-ui/react-alert-dialog';
import {
  CircleIcon,
  FileIcon,
  LaptopIcon,
  MoonIcon,
  SunIcon,
} from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { Button } from '~/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '~/components/ui/command';
import { cn } from '~/lib/utils';

export function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant='outline'
        className={cn(
          'text-muted-foreground relative w-full justify-start text-sm sm:pr-12 md:w-40 lg:w-64',
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className='hidden lg:inline-flex'>Search documentation...</span>
        <span className='inline-flex lg:hidden'>Search...</span>
        <kbd className='bg-muted pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
          <span className='text-xs'>⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Links'>
            <CommandItem
              key='/'
              value='Home'
              onSelect={() => {
                runCommand(() => router.push('/'));
              }}
            >
              <FileIcon className='mr-2 h-4 w-4' />
              Home
            </CommandItem>
            <CommandItem
              key='/user/info'
              value='User'
              onSelect={() => {
                runCommand(() => router.push('/user/info'));
              }}
            >
              <FileIcon className='mr-2 h-4 w-4' />
              User
            </CommandItem>
          </CommandGroup>
          <CommandGroup key='tags' heading='Tags'>
            <CommandItem
              key='react'
              value='react'
              onSelect={() => {
                runCommand(() => router.push('/tags/react'));
              }}
            >
              <div className='mr-2 flex h-4 w-4 items-center justify-center'>
                <CircleIcon className='h-3 w-3' />
              </div>
              React
            </CommandItem>
            <CommandItem
              key='vue'
              value='vue'
              onSelect={() => {
                runCommand(() => router.push('/tags/vue'));
              }}
            >
              <div className='mr-2 flex h-4 w-4 items-center justify-center'>
                <CircleIcon className='h-3 w-3' />
              </div>
              Vue
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Theme'>
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <SunIcon className='mr-2 h-4 w-4' />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <MoonIcon className='mr-2 h-4 w-4' />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <LaptopIcon className='mr-2 h-4 w-4' />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
