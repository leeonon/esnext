/** @jsxImportSource @emotion/react */
"use client";

import tw, { css } from "twin.macro";

import Button from "~/components/TwinButton";

const hoverStyles = css`
  &:hover {
    border-color: black;
    ${tw`text-black`}
  }
`;
const Input = ({ hasHover }: { hasHover: boolean }) => (
  <input css={[tw`border`, hasHover && hoverStyles]} />
);

const styles = {
  // Move long class sets out of jsx to keep it scannable
  container: ({ hasBackground }: { hasBackground: boolean }) => [
    tw`flex flex-col items-center justify-center h-screen`,
    hasBackground && tw`bg-gradient-to-b from-rose-400 to-fuchsia-500`,
  ],
};

export default function Page() {
  return (
    <div css={styles.container({ hasBackground: true })}>
      <div tw="flex flex-col justify-center h-full gap-y-5">
        <h1 css={{ color: "blue" }}>Blue</h1>
        <Input hasHover />
        <Button variant="primary">Submit</Button>
        <Button variant="secondary">Cancel</Button>
        <Button isSmall>Close</Button>
      </div>
    </div>
  );
}
