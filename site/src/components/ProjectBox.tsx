"use client";

import type { ProjectItemType } from "~/types";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Link,
} from "@nextui-org/react";

export type ProjectBoxProps = {
  item: ProjectItemType;
};

export default function ProjectBox(props: ProjectBoxProps) {
  const { item } = props;
  return (
    <Card className="max-h-[200px] max-w-[400px] cursor-pointer rounded-md">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          className="min-w-[40px]"
          height={40}
          width={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
        />
        <div className="flex flex-col">
          <p className="text-md">{item.name}</p>
          <p className="text-small text-default-500">{item.description}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card>
  );
}
