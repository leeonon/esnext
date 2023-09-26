"use client";

export default function ESNextBanner() {
  return (
    <section className="relative flex h-[360px] items-center justify-center md:h-[620px]">
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
        <b className="text-2xl">Every Tool, Every Framework, Every Victory.</b>
      </div>
    </section>
  );
}
