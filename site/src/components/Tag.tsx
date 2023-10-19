import type { ButtonProps } from "@nextui-org/react";
import type { FC, PropsWithChildren } from "react";

const ESNextTag: FC<PropsWithChildren & ButtonProps> = ({ children }) => {
  const className = `inline-flex h-6 w-fit min-w-min cursor-pointer items-center text-xs justify-center rounded-small bg-default-100 px-2 text-tiny font-normal shadow-sm shadow-default/50`;
  return <span className={className}>{children}</span>;
};

export default ESNextTag;
