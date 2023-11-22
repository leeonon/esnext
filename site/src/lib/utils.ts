import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function num2k(num: number) {
  if (num < 1000) return num;
  return `${(num / 1000).toFixed(1)}k`;
}
