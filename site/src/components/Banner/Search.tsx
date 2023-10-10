"use client";

import { Icon } from "@iconify/react";
import { Input, Kbd } from "@nextui-org/react";

export default function Search() {
  return (
    <div className="mt-8 flex w-4/5 items-center overflow-hidden rounded-full border-1 border-solid border-default-100">
      <Input
        placeholder="Try searching for what you want"
        radius="none"
        size="lg"
        startContent={
          <Icon icon="carbon:search" fontSize={26} className="m-2" />
        }
        endContent={<Kbd keys={["command"]}>K</Kbd>}
        classNames={{
          input: [
            "!cursor-pointer",
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focused=true]:bg-default-200/50",
            "dark:group-data-[focused=true]:bg-default/60",
          ],
        }}
      />
    </div>
  );
}
