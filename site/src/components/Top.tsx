'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

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
    <div
      onClick={onClick}
      className='bg-default-100 hover:bg-default-300 fixed bottom-12 right-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all'
    >
      <Icon icon='radix-icons:pin-top' fontSize={20} />
    </div>
  );
}
