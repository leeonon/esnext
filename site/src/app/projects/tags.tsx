"use client";

import type { FC, PropsWithChildren } from "react";

import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";
import { useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";

import { tags } from "~/constant/tags";

export type OnChangeParams = (name: string, value: string) => void;
export type TagProps = PropsWithChildren<{
  value: string;
  selected?: boolean;
  onChangeParams: OnChangeParams;
}>;

const Tag: FC<TagProps> = ({ children, value, onChangeParams }) => {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag") ?? "";
  const onClick = () => onChangeParams("tag", tag ? tag + "," + value : value);

  return (
    <Button radius="full" variant="ghost" size="sm" onClick={onClick}>
      {children}
    </Button>
  );
};

const SelectedTag = ({ tag }: { tag: string }) => {
  return (
    <div className="flex items-center rounded-full bg-default-200 py-1 pl-2 pr-1">
      <span className="text-sm text-default-500">{tag}</span>
      <span className="ml-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-default-300 hover:bg-default-400">
        x
      </span>
    </div>
  );
};

export default function Tags({
  onChangeParams,
}: {
  onChangeParams: OnChangeParams;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

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

  const params = useMemo(() => {
    const tags = searchParams.get("tag");
    if (!tags) {
      return [];
    }
    return tags.split(",");
  }, [searchParams]);

  return (
    <>
      <div className="flex h-16 w-full items-center bg-[hsl(var(--esnext-background))]">
        <div className="relative  ml-4 flex h-[40px] w-full items-center justify-between overflow-hidden">
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
              <Tag
                key={tag.name}
                value={tag.key}
                onChangeParams={onChangeParams}
              >
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
      <div className="my-4 flex flex-wrap gap-3">
        {params.map((name) => (
          <SelectedTag tag={name} key={name} />
        ))}
      </div>
    </>
  );
}
