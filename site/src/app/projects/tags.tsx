"use client";

import type { FC, PropsWithChildren } from "react";

import { cn } from "@nextui-org/react";
import { useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";

import { tags } from "~/constant/tags";

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
  const tag = searchParams.get("tag") ?? "";
  const isActive = useMemo(
    () => tag.split(",").some((item) => item === value),
    [tag, value],
  );
  const onClick = () => {
    if (isActive) {
      const newVal = tag
        .split(",")
        .filter((item) => item !== value)
        .join(",");
      onChangeParams("tag", newVal, newVal === "");
      return;
    }
    onChangeParams("tag", tag ? tag + "," + value : value);
  };

  return (
    <div
      className={cn(
        "min-w-unset relative cursor-pointer rounded-lg px-3 py-2 text-xs transition-transform-colors hover:bg-default/40",
        isActive && "bg-default/40",
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default function Tags({
  onChangeParams,
}: {
  onChangeParams: OnChangeParams;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <div className="my-4 flex w-full items-center rounded-md bg-default-50 py-4">
      <div className="relative ml-4 flex w-full items-center justify-between overflow-hidden">
        <div
          className="scrollbar-none flex w-full flex-1 flex-wrap justify-start gap-2 px-3"
          ref={listRef}
        >
          {tags.map((tag) => (
            <Tag key={tag.name} value={tag.key} onChangeParams={onChangeParams}>
              {tag.name}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
