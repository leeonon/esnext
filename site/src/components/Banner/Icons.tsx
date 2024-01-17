'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

import styles from './styles.module.css';

export default function Icons() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(open);
  }, []);
  return (
    <>
      <motion.div
        className='absolute left-[2rem] top-[8rem]'
        animate={{
          rotate: [0, 90, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 2,
          ease: 'linear',
          times: [0, 0.5, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        <Icon
          icon='logos:react'
          fontSize={40}
          className={`${styles.reactIcon} ${styles.iconTransition}`}
        />
      </motion.div>
      <Icon
        icon='logos:svelte-icon'
        fontSize={50}
        className={`${styles.svelteIcon} ${styles.iconTransition}`}
      />
      <Icon
        icon='logos:bun'
        fontSize={50}
        className={`${styles.bunIcon} ${styles.iconTransition}`}
      />
    </>
  );
}
