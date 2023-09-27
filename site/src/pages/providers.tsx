"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function NextUIProviders({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </NextUIProvider>
  );
}
