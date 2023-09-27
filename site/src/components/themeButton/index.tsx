"use client";

import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <Button
        isIconOnly
        aria-label="Theme"
        className="bg-transparent p-0 data-[hover=true]:bg-transparent"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <Icon
            fontSize={26}
            className="text-yellow-400"
            icon="line-md:moon-filled-to-sunny-filled-loop-transition"
          />
        ) : (
          <Icon
            fontSize={26}
            className="text-slate-800"
            icon="line-md:moon-filled-alt-loop"
          />
        )}
      </Button>
    </div>
  );
}
