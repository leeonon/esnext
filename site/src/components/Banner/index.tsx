"use client";

import { useEffect, useRef, useState } from "react";

import Icons from "~/components/Banner/Icons";
import Search from "~/components/Banner/Search";

import styles from "./styles.module.css";

export default function ESNextBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const bannerEl = bannerRef.current;
    if (!bannerEl) return;
    const onPointerMove = ({ x, y }: PointerEvent) => {
      const bound = bannerEl.getBoundingClientRect();
      if (!bound) return;
      const ratioX = (x - bound.x) / bound.width;
      const ratioY = (y - bound.y) / bound.height;
      const centerX = bound.width / 2;
      const centerY = bound.height / 2;
      const distance = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2),
      );
      const maxDistance = Math.sqrt(
        Math.pow(bound.width / 2, 2) + Math.pow(bound.height / 2, 2),
      );
      const scale = 1 + distance / maxDistance;
      bannerEl.style.setProperty("--ratio-x", `${ratioX}`);
      bannerEl.style.setProperty("--ratio-y", `${ratioY}`);
      bannerEl.style.setProperty("--scale-size", `${scale}`);
    };

    bannerEl.addEventListener("pointermove", onPointerMove);

    return () => {
      bannerEl.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  const renderWord = (word: string, startingDelay: number) => {
    return word.split("").map((letter, index) => {
      const delay = startingDelay + index * 50;
      return (
        <span
          key={index}
          style={{ animationDelay: `${delay}ms` }}
          className={`translate-y-[-150%] animate-fall text-default-foreground`}
        >
          {letter}
        </span>
      );
    });
  };

  return (
    <section
      ref={bannerRef}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`${styles.banner} relative flex h-[360px] max-w-[100vw] items-center justify-center overflow-hidden border-b-1 border-b-default-50 md:h-[480px]`}
    >
      <div className="relative flex flex-col items-center">
        <div
          className={`${styles.gradientText} flex items-center overflow-hidden text-2xl font-black text-transparent md:text-5xl md:leading-snug lg:text-6xl lg:leading-normal`}
        >
          <span
            className={`via-60%to-indigo-500 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-rose-400 via-fuchsia-500 bg-clip-text`}
          >
            Your Frontend
          </span>
          <span className="relative mx-2 ml-2 inline-flex overflow-hidden p-2">
            <div className="flex flex-row">{renderWord("Arsenal", 0)}</div>
            <span className="absolute bottom-0 top-0">
              <div className="flex flex-row">
                {renderWord("Favorites", 1500)}
              </div>
            </span>
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
