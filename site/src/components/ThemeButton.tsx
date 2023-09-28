"use client";

import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();

  const switchTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const onSwitchButton = () => {
    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => void;
    };
    // Chrome 111+
    if (!doc.startViewTransition) {
      switchTheme();
      return;
    }
    doc.startViewTransition(switchTheme);
  };

  return (
    <div>
      <Button
        isIconOnly
        aria-label="Theme"
        className="bg-transparent p-0 data-[hover=true]:bg-transparent"
        onClick={onSwitchButton}
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
