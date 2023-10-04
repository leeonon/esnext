"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";

export function ESNextProviders({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" storageKey="theme" defaultTheme="dark">
        {children}
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </NextUIProvider>
  );
}
