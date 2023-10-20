"use client";

import type { FC, PropsWithChildren } from "react";

import { Icon } from "@iconify/react";
import { cn, Listbox, ListboxItem } from "@nextui-org/react";
import React, { memo } from "react";

import { category } from "~/constant/category";

export type CategoriesProps = {
  visible: boolean;
};

export const IconWrapper: FC<
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

const ItemCounter: FC<{ number: number }> = ({ number }) => (
  <div className="flex items-center gap-1 text-default-400">
    <span className="text-small">{number}</span>
    <Icon fontSize={20} icon="material-symbols:chevron-right-rounded" />
  </div>
);

export default memo(function Categories(props: CategoriesProps) {
  const { visible } = props;
  return (
    <Listbox
      aria-label="Categories Menu"
      onAction={(key) => alert(key)}
      className={cn(
        "transition-max-width top-26 sticky mr-4 h-fit gap-0 divide-y divide-default-300/50 overflow-visible rounded-medium bg-content1 p-0 shadow-small transition-all dark:divide-default-100/80 ",
        visible ? "max-w-[300px]" : "max-w-[55px]",
      )}
      itemClasses={{
        base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
      }}
    >
      {category.map((item) => (
        <ListboxItem
          key={item.name}
          endContent={visible ? <ItemCounter number={13} /> : null}
          startContent={
            <IconWrapper styles={{ backgroundColor: item.color }}>
              <Icon fontSize={16} icon={item.icon} />
            </IconWrapper>
          }
        >
          {visible ? item.name : null}
        </ListboxItem>
      ))}
    </Listbox>
  );
});
