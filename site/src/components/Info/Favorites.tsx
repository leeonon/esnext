import { Icon } from "@iconify/react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { api } from "~/trpc/react";
import { memo, useCallback, useState } from "react";

import FavoritesModal from "~/components/FavoritesModal";

const FavoritesButton = () => {
  const [visible, setVisible] = useState(false);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { data: userFavorites } = api.user.userFavorites.useQuery(undefined, {
    refetchOnWindowFocus: false,
    enabled: visible,
  });
  console.log(
    "🚀 ~ file: Favorites.tsx:23 ~ FavoritesButton ~ data:",
    userFavorites,
  );

  const onAction = useCallback(
    (key: React.Key) => {
      if (key === "new_favorite") {
        onOpen();
      }
    },
    [onOpen],
  );

  return (
    <>
      <Dropdown
        showArrow
        radius="sm"
        isOpen={visible}
        onOpenChange={setVisible}
        classNames={{
          base: "p-0 border-small border-divider bg-background",
          arrow: "bg-default-200",
        }}
      >
        <DropdownTrigger>
          <Button isIconOnly size="md">
            <Icon icon="material-symbols:bookmark-add-outline" fontSize={22} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Action event example"
          onAction={onAction}
          selectionMode="multiple"
          disabledKeys={["empty"]}
          className="p-3"
          itemClasses={{
            base: [
              "rounded-md",
              "text-default-500",
              "transition-opacity",
              "data-[hover=true]:text-foreground",
              "data-[hover=true]:bg-default-100",
              "dark:data-[hover=true]:bg-default-50",
              "data-[selectable=true]:focus:bg-default-50",
              "data-[pressed=true]:opacity-70",
              "data-[focus-visible=true]:ring-default-500",
            ],
          }}
        >
          <DropdownSection>
            <DropdownItem
              textValue="Empty"
              isReadOnly
              key="empty"
              className="h-14 gap-2 opacity-100"
            >
              <div>Haven created favorites yet</div>
            </DropdownItem>
          </DropdownSection>
          <DropdownItem
            key="new_favorite"
            textValue="NewFavorite"
            endContent={<Icon icon="mdi:plus" fontSize={20} />}
          >
            New Favorites
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <FavoritesModal disclosure={{ isOpen, onOpenChange, onClose }} />
    </>
  );
};

export default memo(FavoritesButton);
