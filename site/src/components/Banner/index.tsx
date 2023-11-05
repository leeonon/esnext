'use client';

import Icons from '~/components/Banner/Icons';

import styles from './styles.module.css';

export default function ESNextBanner() {
  return (
    <section
      className={`${styles.banner} relative z-10 flex h-[420px] max-w-[100vw] items-center justify-center overflow-hidden`}
    >
      <div className='relative flex flex-col items-center'>
        <div
          className={`${styles.gradientText} flex items-center overflow-hidden text-2xl font-black text-transparent md:text-5xl md:leading-snug lg:text-6xl lg:leading-normal`}
        >
          <span
            className={`via-60%to-indigo-500 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-rose-400 via-fuchsia-500 bg-clip-text`}
          >
            Your Frontend Arsenal
          </span>
        </div>
        <p className='text-default-400 md:text-base lg:text-2xl'>
          Every Tool, Every Framework, Every Victory.
        </p>
        <p className='text-default-400 md:text-base lg:text-2xl'>
          100,0+ Frontend library & node library.
        </p>
        <Icons />
      </div>
    </section>
  );
}
