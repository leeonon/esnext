import { Icon } from "@iconify/react";
import { Button, Image } from "@nextui-org/react";
import NextImage from "next/image";

import ESNextTag from "~/components/Tag";

export default function ProjectBaseInfo() {
  return (
    <div className="flex items-center justify-between border-b-1 border-default-50 pb-6">
      <div className="flex flex-col">
        <div className="flex items-center gap-4">
          <div className="overflow-hidden rounded-sm shadow-[0_1px_4px_0px] shadow-default-100">
            <Image
              as={NextImage}
              isBlurred
              width={70}
              height={70}
              radius="lg"
              className="projectBoxImage"
              src="https://lee-oss-1300118632.cos.ap-nanjing.myqcloud.com/obsidian/202310091757604.jpg"
              alt=""
            />
          </div>
          <div>
            <div className="text-2xl font-bold">Stack</div>
            <div className="text-default-500">Dribble/shots</div>
            <div className="mt-auto flex gap-2">
              <div>
                <span className="mr-1 text-sm font-bold text-default-600">
                  124k
                </span>
                <span className="text-xs text-default-400">Star</span>
              </div>
              <div>
                <span className="mr-1 text-sm font-bold text-default-600">
                  124k
                </span>
                <span className="text-xs text-default-400">Download/week</span>
              </div>
              <div>
                <span className="mr-1 text-sm font-bold text-default-600">
                  89
                </span>
                <span className="text-xs text-default-400">Contributors</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-2 text-sm text-default-500">
          Stack Server Is a Custom Server Demo. Stack Server Is a Custom Server,
          Yellow Solar Stars Minimalistic Bold.
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button isIconOnly size="sm">
          <Icon icon="material-symbols:bookmark-add-outline" fontSize={22} />
        </Button>
        <Button
          startContent={<Icon icon="mdi:github" fontSize={22} />}
          radius="sm"
          size="sm"
        >
          Repository
        </Button>
        <Button
          startContent={<Icon icon="tabler:home" fontSize={22} />}
          radius="sm"
          size="sm"
        >
          Home
        </Button>
      </div>
      {/* <div className="py-4">Tags</div> */}
      {/* <div className="flex flex-wrap gap-2 text-sm text-default-500">
        <ESNextTag>Peace</ESNextTag>
        <ESNextTag>Love</ESNextTag>
        <ESNextTag>Bio</ESNextTag>
        <ESNextTag>Stack</ESNextTag>
        <ESNextTag>WAS</ESNextTag>
      </div>
      <div className="py-4">Github</div> */}
    </div>
  );
}
