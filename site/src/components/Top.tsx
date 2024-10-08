'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

import { Button } from '~/components/ui/button';

export type TopProps = {
  target?: HTMLDivElement | null;
};

export default function Top(props: TopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = props.target ?? window;

    function onScroll() {
      const scrollTop = props.target ? props.target.scrollTop : window.scrollY;
      setVisible(scrollTop > 200);
    }
    target.addEventListener('scroll', onScroll);
  }, [props.target]);

  const onClick = () => {
    const target = props.target ?? window;

    target.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <Button
      onClick={onClick}
      className='fixed bottom-12 right-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-0 transition-all'
    >
      <Icon icon='radix-icons:pin-top' fontSize={16} />
    </Button>
  );
}
