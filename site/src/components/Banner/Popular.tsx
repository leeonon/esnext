'use client';

import type { FC } from 'react';

import { POPULAR_PROJECTS } from '~/constant/popular';
import { cn } from '~/lib/utils';

import PopularCard from './PopularCard';
import styles from './styles.module.css';

type PopularListProps = {
  className?: string;
};

const PopularList = ({
  className,
  warpStyle,
}: {
  className?: string;
  warpStyle?: React.CSSProperties;
}) => {
  return (
    <div className='flex w-full overflow-hidden' style={warpStyle}>
      <div className={cn('flex gap-4', className)}>
        {POPULAR_PROJECTS.map((_, index) => (
          <PopularCard key={index} name={_.name} logo={_.logo} />
        ))}
      </div>
    </div>
  );
};

const Popular: FC<PopularListProps> = ({ className }) => {
  return (
    <div className={cn(className, styles.popularContainer)}>
      <PopularList
        warpStyle={{ justifyContent: 'flex-star' }}
        className={cn(styles.popularList, styles.popularListLeft)}
      />
      <PopularList
        warpStyle={{ justifyContent: 'flex-end' }}
        className={cn(styles.popularList, styles.popularListRight)}
      />
      <PopularList className={cn(styles.popularList, styles.popularListLeft)} />
    </div>
  );
};

export default Popular;
