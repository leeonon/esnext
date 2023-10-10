import type { FC, PropsWithChildren } from "react";

const OverView: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <h1>123</h1>
      {children}
    </div>
  );
};

export default OverView;
