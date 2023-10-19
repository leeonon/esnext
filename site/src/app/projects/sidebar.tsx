"use client";

import type { FC, PropsWithChildren } from "react";

import { Icon } from "@iconify/react";
import { cn } from "@nextui-org/react";

import { category } from "~/constant/category";

export type onChangeParams = (name: string, value: string) => void;

const IconWrapper: FC<
  PropsWithChildren<{ className?: string; styles?: React.CSSProperties }>
> = ({ children, className, styles }) => (
  <div
    className={cn(
      className,
      "flex h-7 w-7 min-w-[1.75rem] items-center justify-center rounded-small",
    )}
    style={styles}
  >
    {children}
  </div>
);

function SidebarItem({
  item,
  isActive,
  onChangeParams,
}: {
  item: (typeof category)[0];
  isActive: boolean;
  onChangeParams: onChangeParams;
}) {
  const onClick = () => onChangeParams("category", item.name);
  return (
    <div
      className={cn(
        "flex h-12 cursor-pointer items-center gap-4 rounded-lg px-4 transition-background hover:bg-default-200",
        isActive && "bg-default-200",
      )}
      onClick={onClick}
    >
      <IconWrapper styles={{ backgroundColor: item.color }}>
        <Icon fontSize={16} icon={item.icon} />
      </IconWrapper>
      <div>{item.name}</div>
      <div className="ml-auto text-small text-default-400">{item.count}</div>
    </div>
  );
}

export default function Sidebar({
  onChangeParams,
}: {
  onChangeParams: onChangeParams;
}) {
  return (
    <div className="mt-20 px-4">
      {category.map((item) => (
        <SidebarItem
          key={item.name}
          item={item}
          onChangeParams={onChangeParams}
          isActive={item.name === "ALL"}
        />
      ))}
    </div>
  );
}
