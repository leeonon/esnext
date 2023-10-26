"use client";

import { Global } from "@emotion/react";
import tw, { css, globalStyles, theme } from "twin.macro";

import "~/styles/globals.css";

const filteredGlobalStyles = Object.fromEntries(
  Object.entries(globalStyles).filter(
    /* 处理button 默认样式覆盖导致背景颜色透明 */
    (k) => k[0] !== "button, [type='button'], [type='reset'], [type='submit']",
  ),
);

const customStyles = css({
  body: {
    WebkitTapHighlightColor: theme`colors.purple.500`,
    ...tw`antialiased`,
    ...filteredGlobalStyles,
  },
});

const GlobalStyles = () => (
  <>
    {/*
      https://github.com/ben-rogerson/twin.macro/issues/773
      https://github.com/tailwindlabs/tailwindcss/blob/d0ecd2988637d6bbe4751a6bc60fb579e664da35/src/css/preflight.css#L186
      https://github.com/ben-rogerson/twin.macro/discussions/719
      https://github.com/ben-rogerson/twin.macro/issues/277
    */}
    <Global styles={customStyles} />
  </>
);

export default GlobalStyles;
