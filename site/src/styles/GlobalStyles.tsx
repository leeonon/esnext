"use client";

import { Global } from "@emotion/react";
import tw, { css, theme } from "twin.macro";

const customStyles = css({
  body: {
    WebkitTapHighlightColor: theme`colors.purple.500`,
    ...tw`antialiased`,
  },
});

const GlobalStyles = () => (
  <>
    {/* https://github.com/ben-rogerson/twin.macro/discussions/719
    https://github.com/ben-rogerson/twin.macro/issues/277 */}
    {/* <BaseStyles /> */}
    <Global styles={customStyles} />
  </>
);

export default GlobalStyles;
