'use client';

import type { FC } from 'react';
import type { Root } from 'react-dom/client';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { useCallback } from 'react';
import { createRoot } from 'react-dom/client';

type ConfirmStatic = {
  open: (props: ConfirmStaticParma) => void;
  close: () => void;
};
type ConfirmProps = {
  visible: boolean;
  onOk: () => void;
  onCancel?: () => void;
};
type ConfirmStaticParma = Omit<ConfirmProps, 'visible'>;
let root: Root | null = null;
let mount: HTMLDivElement | null = null;

const Confirm: FC<ConfirmProps> & ConfirmStatic = ({
  visible,
  onOk,
  onCancel,
}) => {
  const { isOpen, onClose } = useDisclosure({
    defaultOpen: visible,
    onClose: onCancel,
  });

  const handleOk = useCallback(() => {
    onOk();
    onClose();
  }, [onClose, onOk]);

  return (
    <Modal size='xs' isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Delete Folder</ModalHeader>
            <ModalBody>
              <p>Confirm whether to delete the current folder?</p>
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' onPress={onClose}>
                Cancel
              </Button>
              <Button color='primary' onPress={handleOk}>
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

Confirm.open = (props: ConfirmStaticParma) => {
  if (root) {
    return;
  }
  if (!mount) {
    mount = document.createElement('div');
  }
  root = createRoot(mount);
  document.body.appendChild(mount);

  root.render(
    <Confirm
      {...props}
      visible
      onCancel={() => {
        props.onCancel?.();
        Confirm.close();
      }}
    />,
  );
};

Confirm.close = () => {
  if (root) {
    root.unmount();
    root = null;
  }
};
export default Confirm;
