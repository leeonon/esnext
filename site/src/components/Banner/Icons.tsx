"use client";

import { Icon } from "@iconify/react";

import styles from "./styles.module.css";

type IconsProps = {
  isHover: boolean;
};

export default function Icons(props: IconsProps) {
  return (
    <>
      <Icon
        icon="logos:react"
        fontSize={40}
        data-hover={props.isHover}
        className={`${styles.reactIcon} ${styles.iconTransition}`}
      />
      <Icon
        icon="logos:svelte-icon"
        fontSize={50}
        data-hover={props.isHover}
        className={`${styles.svelteIcon} ${styles.iconTransition}`}
      />
      <Icon
        icon="logos:bun"
        data-hover={props.isHover}
        fontSize={50}
        className={`${styles.bunIcon} ${styles.iconTransition}`}
      />
    </>
  );
}
