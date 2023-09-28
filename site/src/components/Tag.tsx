import type { ButtonProps } from "@nextui-org/react";
import type { FC, PropsWithChildren } from "react";

import { Button } from "@nextui-org/react";

const ESNextTag: FC<PropsWithChildren & ButtonProps> = ({ children }) => {
  return (
    <Button
      size="sm"
      variant="shadow"
      radius="sm"
      className="h-6 w-fit min-w-min px-2 text-white shadow-lg"
    >
      {children}
    </Button>
  );
};

export default ESNextTag;
