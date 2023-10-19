"use client";

import type { FC, PropsWithChildren } from "react";

import { Icon } from "@iconify/react";
import { cn } from "@nextui-org/react";
import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { category } from "~/constant/category";

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
}: {
  item: (typeof category)[0];
  isActive: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const onClick = () => {
    router.push(pathname + "?" + createQueryString("category", item.name));
  };
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

export default function Sidebar() {
  return (
    <div className="px-4 pt-20">
      {category.map((item) => (
        <SidebarItem
          key={item.name}
          item={item}
          isActive={item.name === "ALL"}
        />
      ))}
    </div>
  );
}
