import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Select,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useFollowingQuery, User } from "../../../../../generated/graphql";

const CreateChatPrivateModalContent = ({
  followingUsers,
  onModalClose,
}: {
  followingUsers: User[];
  onModalClose: () => void;
}) => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  return (
    <>
      <ModalBody>
        <Box>
          <Box>
            <Box mb="0.5em">
              <Text fontWeight={"bold"}>Select a user:</Text>
            </Box>
            <Select
              onChange={(e) => {
                setSelectedUser(
                  followingUsers.find((user) => user.id === e.target.value)
                );
              }}
            >
              <option value="" disabled selected>
                Select user...
              </option>
              {followingUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </Select>
          </Box>
          <Box>
            {selectedUser ? (
              <Text color="gray.400">
                Private chat with <b>{selectedUser.username}</b>
              </Text>
            ) : (
              <Text visibility={"hidden"}>Hidden</Text>
            )}
          </Box>
        </Box>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3}>
          Create Chat
        </Button>
        <Button variant="ghost" onClick={onModalClose}>
          Cancel
        </Button>
      </ModalFooter>
    </>
  );
};

const CreateChatRoomModalContent = ({
  followingUsers,
  onModalClose,
}: {
  followingUsers: User[];
  onModalClose: () => void;
}) => {
  return (
    <>
      <ModalBody>
        <Box>
          <Box>{followingUsers.map((user) => user.username)}</Box>
        </Box>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3}>
          Create Chat
        </Button>
        <Button variant="ghost" onClick={onModalClose}>
          Cancel
        </Button>
      </ModalFooter>
    </>
  );
};

const CreateChatModal = ({
  chatType,
  modalDisclosure,
}: {
  chatType: "ChatPrivate" | "ChatRoom";
  modalDisclosure: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
    getButtonProps: (_?: any) => any;
    getDisclosureProps: (_?: any) => any;
  };
}) => {
  const { isOpen, onClose } = modalDisclosure;

  const [result] = useFollowingQuery();

  const followingError = result.error;
  const followingLoading = result.fetching;
  const followingData = result.data;

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Box display={"flex"} flexDir="row">
              Create new
              <Text fontWeight={"bold"} ml="0.25em" color={"blue.300"}>
                {chatType === "ChatPrivate" ? "private chat" : "chat room"}
              </Text>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          {!followingData ? null : chatType === "ChatPrivate" ? (
            <CreateChatPrivateModalContent
              followingUsers={followingData.following as User[]}
              onModalClose={onClose}
            />
          ) : (
            <CreateChatRoomModalContent
              followingUsers={followingData.following as User[]}
              onModalClose={onClose}
            />
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
};

export interface Props {}

const CreateChat = (): JSX.Element => {
  const createChatDisclosure = useDisclosure();

  const initRef = useRef<any>();

  const [selectedChatType, setSelectedChatType] = useState<
    "ChatRoom" | "ChatPrivate" | null
  >(null);

  const onChatTypeSelect = (chatType: "ChatRoom" | "ChatPrivate") => {
    setSelectedChatType(chatType);
    createChatDisclosure.onOpen();
  };

  return (
    <>
      <Box>
        <Popover initialFocusRef={initRef}>
          {({ onClose }) => (
            <>
              <Tooltip
                hasArrow
                placement="top"
                label={"Create new chat"}
                aria-label={`Create new chat tooltip`}
              >
                <PopoverTrigger>
                  <IconButton
                    w={"100%"}
                    colorScheme="teal"
                    variant={"ghost"}
                    aria-label="Create new chat"
                    icon={<AddIcon boxSize={5} />}
                  />
                </PopoverTrigger>
              </Tooltip>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>Create new chat</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Box>
                      <Text fontWeight={"bold"}>Choose chat type:</Text>
                    </Box>
                    <Box
                      py="1em"
                      display={"flex"}
                      flexDir="row"
                      justifyContent={"center"}
                    >
                      <Button
                        colorScheme={"teal"}
                        ref={initRef}
                        onClick={() => {
                          onClose();
                          onChatTypeSelect("ChatPrivate");
                        }}
                      >
                        Private
                      </Button>
                      <Box mx={"1em"}>
                        <Text pt="0.5em">or</Text>
                      </Box>
                      <Button
                        ref={initRef}
                        onClick={() => {
                          onClose();
                          onChatTypeSelect("ChatRoom");
                        }}
                      >
                        Room
                      </Button>
                    </Box>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </>
          )}
        </Popover>
      </Box>
      {selectedChatType ? (
        <CreateChatModal
          chatType={selectedChatType}
          modalDisclosure={createChatDisclosure}
        />
      ) : null}
    </>
  );
};

export default CreateChat;
