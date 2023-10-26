"use client";

import { Icon } from "@iconify/react";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const onAction = useCallback(
    (key: React.Key) => {
      router.push(`/user/${key}`);
    },
    [router],
  );

  return (
    <div className="sticky top-[calc(4rem+1px)] h-screen w-[200px] self-start border-r-1 border-default-50 px-4 pt-4">
      <Listbox
        aria-label="Listbox menu with sections"
        variant="shadow"
        onAction={onAction}
      >
        <ListboxSection showDivider>
          <ListboxItem key="info" startContent={<Icon icon="ph:user-circle" />}>
            User Info
          </ListboxItem>
          <ListboxItem
            key="favorites"
            startContent={<Icon icon="icon-park-outline:weixin-favorites" />}
          >
            My Favorites
          </ListboxItem>
          <ListboxItem
            key="stars"
            startContent={<Icon icon="material-symbols:star-outline" />}
          >
            My Stars
          </ListboxItem>
          <ListboxItem
            key="loved"
            startContent={<Icon icon="mdi:heart-multiple" />}
          >
            My Loved
          </ListboxItem>
        </ListboxSection>
        <ListboxSection title="Danger zone">
          <ListboxItem
            key="delete"
            className="text-secondary"
            color="secondary"
            startContent={<Icon icon="solar:programming-linear" />}
          >
            About
          </ListboxItem>
        </ListboxSection>
      </Listbox>
    </div>
  );
}
