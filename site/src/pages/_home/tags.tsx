"use client";

import type { FC, PropsWithChildren } from "react";

import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";
import { useRef } from "react";

import { tags } from "~/constant/tags";

export type TagProps = PropsWithChildren<{
  value: string;
  selected?: boolean;
}>;

export type TagsProps = PropsWithChildren<{
  categoryVisible: boolean;
  onChangeFilter?: () => void;
}>;

const Tag: FC<TagProps> = ({ children, value }) => {
  const onClick = () => {
    alert(value);
  };

  return (
    <Button radius="full" variant="ghost" size="sm" onClick={onClick}>
      {children}
    </Button>
  );
};

export default function Tags(props: TagsProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const { onChangeFilter, categoryVisible } = props;

  const onLeftScroll = () => {
    if (!listRef.current) return;
    const scrollLeft = listRef.current.scrollLeft;
    const offsetWidth = listRef.current.offsetWidth;

    if (scrollLeft === 0) return;

    listRef.current.scrollTo({
      left: scrollLeft - offsetWidth + 200,
      behavior: "smooth",
    });
  };

  const onRightScroll = () => {
    if (!listRef.current) return;
    const scrollLeft = listRef.current.scrollLeft;
    const offsetWidth = listRef.current.offsetWidth;

    if (scrollLeft === offsetWidth) return;

    listRef.current.scrollTo({
      left: scrollLeft + offsetWidth - 200,
      behavior: "smooth",
    });
  };

  return (
    <div className="sticky top-16 z-20 flex h-16 w-full items-center bg-[hsl(var(--esnext-background))]">
      <Button
        onClick={onChangeFilter}
        radius="sm"
        variant="bordered"
        isIconOnly
        endContent={
          <Icon
            icon={
              categoryVisible
                ? "icon-park-outline:expand-right"
                : "icon-park-outline:expand-left"
            }
            fontSize={24}
          />
        }
      ></Button>
      <div className="relative ml-4 flex h-[40px] w-full items-center justify-between overflow-hidden">
        <div className="absolute z-10 w-[80px] bg-gradient-to-r from-[hsl(var(--esnext-background))] via-[hsl(var(--esnext-background))] to-transparent">
          <Button
            isIconOnly
            variant="light"
            radius="full"
            onClick={onLeftScroll}
          >
            <Icon icon="ph:arrow-left" />
          </Button>
        </div>
        <div
          className="scrollbar-none flex w-full flex-1 justify-start gap-2 overflow-x-scroll px-12"
          ref={listRef}
        >
          {tags.map((tag) => (
            <Tag key={tag.name} value={tag.key}>
              {tag.name}
            </Tag>
          ))}
        </div>
        <div className="absolute right-0 z-10 flex w-[80px] justify-end bg-gradient-to-l from-[hsl(var(--esnext-background))] via-[hsl(var(--esnext-background))] to-transparent">
          <Button
            isIconOnly
            variant="light"
            radius="full"
            onClick={onRightScroll}
          >
            <Icon icon="ph:arrow-right" />
          </Button>
        </div>
      </div>
    </div>
  );
}
