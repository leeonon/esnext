/**
 * https://codepen.io/jh3y/pen/vYbyKeL
 */

import type { FC, PropsWithChildren } from 'react';

import { cn } from '~/lib/utils';

import S from './index.module.css';

export type GlowButtonProps = PropsWithChildren<{
  className?: string;
}>;

export const GlowButton: FC<GlowButtonProps> = ({ children }) => {
  return (
    <div className={S.glowBtn}>
      <span className={S.glows}>
        <span className={cn(S.spark__container, S.spark__glows)}>
          <span className={S.spark}></span>
          <span className={S.spark}></span>
        </span>
      </span>
      <span className={S.spark__container}>
        <span className={S.spark}></span>
        <span className={S.spark}></span>
      </span>
      <span className={S.backdrop}></span>
      {children}
    </div>
  );
};
