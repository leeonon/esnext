"use client";

import type { ProjectItemType } from "~/types";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";

import ESNextTag from "~/components/Tag";

export type ProjectBoxProps = {
  item: ProjectItemType;
  className?: string;
};

export default function ProjectBox(props: ProjectBoxProps) {
  const { item, className } = props;
  return (
    <Card
      isPressable
      isFooterBlurred
      className={`max-h-[200px] w-full rounded-md ${className}`}
    >
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          className="min-w-[40px]"
          height={40}
          width={40}
          radius="sm"
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
