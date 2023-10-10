"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

import styles from "./styles.module.css";

type IconsProps = {
  isHover: boolean;
};

export default function Icons(props: IconsProps) {
  return (
    <>
      <motion.div
        className="absolute left-[2rem] top-[8rem]"
        animate={{
          rotate: [0, 90, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 2,
          ease: "linear",
          times: [0, 0.5, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        <Icon
          icon="logos:react"
          fontSize={40}
          data-hover={props.isHover}
          className={`${styles.reactIcon} ${styles.iconTransition}`}
        />
      </motion.div>
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
