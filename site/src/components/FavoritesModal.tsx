"use client";

import type { useDisclosure } from "@nextui-org/react";
import type { FC } from "react";

import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { api } from "~/trpc/react";
import { memo, useState } from "react";

type UseDisclosureReturn = ReturnType<typeof useDisclosure>;

export type FavoritesModalProps = {
  disclosure: Partial<UseDisclosureReturn>;
};

const FavoritesModal: FC<FavoritesModalProps> = ({ disclosure }) => {
  const { isOpen, onOpenChange, onClose } = disclosure;
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const createFavorites = api.favorites.create.useMutation({
    onSuccess: () => {
      alert("success");
      onClose && onClose();
    },
    onError: (err) => {
      alert(err.message);
    },
  });
  const onCreate = async () => {
    if (!name || name.length > 30) {
      return;
    }
    await createFavorites.mutateAsync({
      name,
    });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Create Favorites
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                value={name}
                isInvalid={name.length > 30}
                errorMessage={name.length > 30 && "Name up to 30 characters"}
                onValueChange={setName}
                isRequired
                label="Name"
                placeholder="Enter your favorites name"
                variant="bordered"
              />
              <div className="flex justify-between px-1 py-2">
                <Checkbox
                  isSelected={isPublic}
                  onValueChange={setIsPublic}
                  classNames={{
                    label: "text-small",
                  }}
                >
                  Public
                </Checkbox>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onClick={() => void onCreate()}>
                Create
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default memo(FavoritesModal);
