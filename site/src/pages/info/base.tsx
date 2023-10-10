import { Icon } from "@iconify/react";
import { Button, Image } from "@nextui-org/react";
import NextImage from "next/image";

import ESNextTag from "~/components/Tag";

export default function ProjectBaseInfo() {
  return (
    <div className="border-b-1 border-default-100 pb-6">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <Image
            as={NextImage}
            isZoomed={true}
            radius="lg"
            width={50}
            height={50}
            className="projectBoxImage"
            src="https://lee-oss-1300118632.cos.ap-nanjing.myqcloud.com/obsidian/202310091757604.jpg"
            alt=""
          />
          <div>
            <div className="text-lg font-bold">Stack Server</div>
            <div className="text-default-300">Dribble/shots</div>
          </div>
          <div className="flex gap-2">
            <Button isIconOnly size="sm">
              <Icon icon="mdi:plus" fontSize={22} />
            </Button>
            <Button isIconOnly size="sm">
              <Icon icon="mdi:heart" fontSize={22} />
            </Button>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            startContent={<Icon icon="mdi:github" fontSize={26} />}
            radius="sm"
          >
            Repo
          </Button>
          <Button
            startContent={<Icon icon="tabler:home" fontSize={26} />}
            radius="sm"
          >
            Home
          </Button>
        </div>
      </div>
      <div className="border-b-1 border-default-100 pb-4 pt-4 text-sm text-default-500">
        Stack Server Is a Custom Server Demo. Stack Server Is a Custom Server,
        Yellow Solar Stars Minimalistic Bold.
      </div>
      <div className="py-4">Tags</div>
      <div className="flex flex-wrap gap-2 text-sm text-default-500">
        <ESNextTag>Peace</ESNextTag>
        <ESNextTag>Love</ESNextTag>
        <ESNextTag>Bio</ESNextTag>
        <ESNextTag>Stack</ESNextTag>
        <ESNextTag>WAS</ESNextTag>
      </div>
      <div className="py-4">Github</div>
    </div>
  );
}
