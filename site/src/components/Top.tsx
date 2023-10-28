'use client';

import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

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
    <div
      onClick={onClick}
      className='fixed bottom-12 right-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-default-100 transition-all hover:bg-default-300'
    >
      <Icon icon='radix-icons:pin-top' fontSize={20} />
    </div>
  );
}
