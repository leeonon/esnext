"use client";

import { useState } from "react";

import Icons from "~/components/Banner/Icons";
import Search from "~/components/Banner/Search";

import styles from "./styles.module.css";

export default function ESNextBanner() {
  const [isHover, setIsHover] = useState(false);

  return (
    <section
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`${styles.banner} relative z-10 flex max-w-[100vw] justify-center overflow-hidden border-b-1 border-b-default-50 pt-[150px]`}
    >
      <div className="relative flex flex-col items-center">
        <div
          className={`${styles.gradientText} flex items-center overflow-hidden text-2xl font-black text-transparent md:text-5xl md:leading-snug lg:text-6xl lg:leading-normal`}
        >
          <span
            className={`via-60%to-indigo-500 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-rose-400 via-fuchsia-500 bg-clip-text`}
          >
            Your Frontend Arsenal
          </span>
        </div>
        <p className="text-default-400 md:text-base lg:text-2xl">
          Every Tool, Every Framework, Every Victory.
        </p>
        <p className="text-default-400 md:text-base lg:text-2xl">
          100,0+ Frontend library & node library.
        </p>
        <div className="flex w-full items-center justify-center">
          <Search />
        </div>
        <Icons isHover={isHover} />
      </div>
    </section>
  );
}
