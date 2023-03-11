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
  useToast,
} from "@chakra-ui/react";

const ConfirmModal = ({
  isOpen,
  onClose,
  headerText,
  bodyContent,
  closeText,
  confirmText,
  toastText,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  headerText: string;
  bodyContent: JSX.Element;
  closeText: string;
  confirmText: string;
  toastText: {
    success: string;
    error: string;
  };
  onConfirm: (_: any) => Promise<boolean>;
}) => {
  const toast = useToast();

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
          <Button
            variant="solid"
            colorScheme={"red"}
            onClick={async (event) => {
              const result = await onConfirm(event);
              if (result) {
                toast({
                  id: "delete-note-success",
                  title: toastText.success,
                  status: "success",
                  position: "top",
                  duration: 2000,
                });
              } else {
                toast({
                  id: "delete-note-error",
                  title: toastText.error,
                  status: "error",
                  position: "top",
                  duration: 2000,
                });
              }
            }}
          >
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
