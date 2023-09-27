"use client";

import Search from "~/components/banner/Search";

export default function ESNextBanner() {
  return (
    <section className="relative flex h-[360px] items-center justify-center border-b-1 border-b-default-50 md:h-[480px]">
      <div className="flex flex-col items-center">
        <b
          className="
            bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))]
            from-rose-400 via-fuchsia-500 via-60% to-indigo-500 bg-clip-text
            text-2xl text-transparent md:text-5xl md:leading-snug lg:text-6xl lg:leading-normal"
        >
          Your Frontend Arsenal
        </b>
        <br />
        <p className="text-default-400 md:text-base lg:text-2xl">
          Every Tool, Every Framework, Every Victory.
        </p>
        <p className="text-default-400 md:text-base lg:text-2xl">
          100,0+ Frontend library & node library.
        </p>
        <div className="flex w-full items-center justify-center">
          <Search />
        </div>
      </div>
    </section>
  );
}
