"use client";

import type { ProjectItemType } from "~/types";

import { Icon } from "@iconify/react";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Skeleton,
} from "@nextui-org/react";
import { useRef } from "react";
import { useRouter } from "next/navigation";

import ESNextTag from "~/components/Tag";

export type ProjectBoxProps = {
  item: ProjectItemType;
  className?: string;
};

export function ProjectSkeleton() {
  return (
    <Card
      className="w-full flex-auto space-y-5 p-4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4"
      radius="sm"
    >
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
}

export default function ProjectBox(props: ProjectBoxProps) {
  const { item, className } = props;
  const router = useRouter();
  const imgRef = useRef<HTMLImageElement>(null);

  const onPushDetail = () => {
    router.push(`/info/${item.name.toLocaleLowerCase()}`);
  };

  const onClick = () => {
    onPushDetail();
  };

  const linkToGithub = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    window.open(`https://github.com/${item.fullName}`);
  };

  return (
    <Card
      isPressable
      onClick={onClick}
      className={`max-h-[200px] w-full rounded-md ${className} cursor-pointer hover:bg-default-100`}
    >
      <CardHeader className="flex gap-3">
        <div className="h-[40px] w-[40px]">
          <Image
            isBlurred
            alt="nextui logo"
            className="min-w-[40px]"
            height={40}
            width={40}
            radius="sm"
            ref={imgRef}
            src="https://lee-oss-1300118632.cos.ap-nanjing.myqcloud.com/obsidian/202310181428834.png"
          />
        </div>
        <div className="flex flex-col items-start">
          <p className="text-md">{item.name}</p>
          <p className="line-clamp-2 text-left text-small text-default-500">
            {item.description}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="relative overflow-hidden p-2">
        <div>12</div>
        <div className="flex flex-row items-center justify-start gap-2">
          <ESNextTag>React</ESNextTag>
          <ESNextTag>Vue</ESNextTag>
          <ESNextTag>TypeScript</ESNextTag>
        </div>
        <div
          onClick={linkToGithub}
          className="absolute -bottom-1 -right-1 flex items-center justify-center rounded-md bg-default-100 p-2 transition-background hover:bg-primary"
        >
          <Icon icon="mdi:github" fontSize={24} />
        </div>
      </CardBody>
    </Card>
  );
}
