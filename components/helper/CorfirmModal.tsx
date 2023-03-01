import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { MouseEventHandler } from "react";

const ConfirmModal = ({
  isOpen,
  onClose,
  headerText,
  bodyContent,
  closeText,
  confirmText,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  headerText: string;
  bodyContent: JSX.Element;
  closeText: string;
  confirmText: string;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{headerText}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{bodyContent}</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            {closeText}
          </Button>
          <Button variant="solid" colorScheme={"red"} onClick={onConfirm}>
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
