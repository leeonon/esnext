import type { FC, PropsWithChildren } from 'react';

import { useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

import { Card } from '~/components/ui/card';
import { Toggle } from '~/components/ui/toggle';
import { tags } from '~/constant/tags';

export type OnChangeParams = (
  name: string,
  value: string,
  isDelete?: boolean,
) => void;
export type TagProps = PropsWithChildren<{
  value: string;
  selected?: boolean;
  onChangeParams: OnChangeParams;
}>;

const Tag: FC<TagProps> = ({ children, value, onChangeParams }) => {
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag') ?? '';
  const isActive = useMemo(
    () => tag.split(',').some((item) => item === value),
    [tag, value],
  );
  const onClick = () => {
    if (isActive) {
      const newVal = tag
        .split(',')
        .filter((item) => item !== value)
        .join(',');
      onChangeParams('tag', newVal, newVal === '');
      return;
    }
    onChangeParams('tag', tag ? tag + ',' + value : value);
  };

  return (
    <Toggle
      variant='outline'
      size='sm'
      pressed={isActive}
      aria-label='Toggle italic'
      className='min-w-unset text-xs'
      onClick={onClick}
    >
      {children}
    </Toggle>
  );
};

export interface TagsProps {
  onChangeParams: (name: string, value: string, isDelete?: boolean) => void;
}

export default function Tags({ onChangeParams }: TagsProps) {
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <Card className='bg-default-50 my-4 flex w-full items-center rounded-md py-4'>
      <div className='relative ml-4 flex w-full items-center justify-between overflow-hidden'>
        <div
          className='scrollbar-none flex w-full flex-1 flex-wrap justify-start gap-2 px-3'
          ref={listRef}
        >
          {tags.map((tag) => (
            <Tag key={tag.name} value={tag.key} onChangeParams={onChangeParams}>
              {tag.name}
            </Tag>
          ))}
        </div>
      </div>
    </Card>
  );
}
