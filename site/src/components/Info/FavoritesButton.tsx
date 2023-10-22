"use client";

import type { UserFavoritesItemType } from "~/types";
import type { FC } from "react";

import { Icon } from "@iconify/react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { api } from "~/trpc/react";
import { useCallback, useEffect, useMemo, useState } from "react";

import FavoritesModal from "~/components/FavoritesModal";

import { type FavoritesButtonProps } from "./Favorites";
import FavoritesItem from "./FavoritesItem";

export const FavoritesButton: FC<FavoritesButtonProps> = ({ project }) => {
  const [checkedKeys, setCheckedKeys] = useState<Set<number>>(new Set([]));
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: userFavorites } = api.user.userFavorites.useQuery(undefined, {
    refetchOnWindowFocus: false,
    enabled: isOpen,
  });

  useEffect(() => {
    if (userFavorites) {
      const next = new Set<number>();
      userFavorites.forEach((favorite) => {
        if (favorite.projects.some((p) => p.id === project?.id)) {
          next.add(favorite.id);
        }
      });
      setCheckedKeys(next);
    }
  }, [userFavorites]);

  const checkedItems = useCallback(
    (item: UserFavoritesItemType) => {
      return item.projects.some((p) => p.id === project?.id);
    },
    [project],
  );

  const onCheck = useCallback((id: number) => {
    setCheckedKeys((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const itemList = useMemo(() => {
    if (userFavorites && userFavorites.length > 0) {
      return userFavorites.map((favorite) => (
        <FavoritesItem
          key={favorite.id}
          item={favorite}
          isChecked={checkedItems(favorite)}
          onCheck={onCheck}
        />
      ));
    }
    return (
      <div className="h-30 flex items-center justify-center">
        Haven created favorites yet
      </div>
    );
  }, [checkedItems, onCheck, userFavorites]);

  return (
    <div>
      <Button isIconOnly size="md" onClick={onOpen}>
        <Icon icon="material-symbols:bookmark-add-outline" fontSize={22} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Favorites
              </ModalHeader>
              <ModalBody>
                <Input placeholder="Search" fullWidth />
                <div className="scrollbar-none flex max-h-[400px] flex-col gap-2 overflow-y-scroll">
                  {itemList}
                </div>
              </ModalBody>
              <ModalFooter className="border-t-1 border-default-100">
                <FavoritesModal />
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary">Done</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
