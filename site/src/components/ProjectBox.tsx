"use client";

import type { ProjectItemType } from "~/types";

import {
  Card,
  CardBody,
  CardFooter,
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
    // const doc = document as Document & {
    //   startViewTransition?: (callback: () => void) => void;
    // };
    // if (!doc.startViewTransition) {
    //   onPushDetail();
    //   return;
    // }
    // const img = imgRef.current;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // https://github.com/vercel/next.js/discussions/46300
    // img.style.viewTransitionName = "projectBoxImage";
    // console.log("🚀 ~ file: ProjectBox.tsx:69 ~ onClick ~ img:", img);
    // doc.startViewTransition(onPushDetail);
  };

  return (
    <Card
      isPressable
      isFooterBlurred
      onClick={onClick}
      className={`max-h-[200px] w-full rounded-md ${className} hover:bg-default-100`}
    >
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          className="min-w-[40px]"
          height={40}
          width={40}
          radius="sm"
          ref={imgRef}
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
        />
        <div className="flex flex-col items-start">
          <p className="text-md">{item.name}</p>
          <p className="line-clamp-2 text-left text-small text-default-500">
            {item.description}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-row items-center justify-start gap-2 overflow-hidden">
        Star
      </CardBody>
      <Divider />
      <CardFooter className="gap-2">
        <ESNextTag>React</ESNextTag>
        <ESNextTag>Vue</ESNextTag>
        <ESNextTag>TypeScript</ESNextTag>
      </CardFooter>
    </Card>
  );
}
