import type { ButtonProps } from "@nextui-org/react";
import type { FC, PropsWithChildren } from "react";

const ESNextTag: FC<PropsWithChildren & ButtonProps> = ({ children }) => {
  return (
    <span className="inline-flex h-6 w-fit min-w-min cursor-pointer items-center justify-center rounded-small bg-default px-2 text-tiny font-normal shadow-sm shadow-default/50">
      {children}
    </span>
  );
};

export default ESNextTag;
