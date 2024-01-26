import { AddIcon } from "@chakra-ui/icons";
import {
  Avatar,
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
import {
  ChatPrivate,
  ChatRoom,
  useFollowingQuery,
  useMeQuery,
  User,
} from "../../../../../generated/graphql";

const CreateChatPrivateModalContent = ({
  chats,
  followingUsers,
  onModalClose,
}: {
  chats: ChatPrivate[];
  followingUsers: User[];
  onModalClose: () => void;
}) => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [result] = useMeQuery();
  const me = result.data?.me;

  const currentChatUsers = chats.map((c) => {
    return c.participants.filter((p) => p.id !== me?.id)[0].id;
  });
  const noChatsUsers = followingUsers.filter(
    (fu) => !currentChatUsers.includes(fu.id)
  );

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
              {noChatsUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  <Box>
                    <Text>{user.username}</Text>
                  </Box>
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
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

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
                const user = followingUsers.find(
                  (fu) => fu.id === e.target.value
                ) as User;
                if (selectedUsers.find((su) => su.id === user.id)) return;
                setSelectedUsers([...selectedUsers, user]);
              }}
            >
              <option value="" disabled selected>
                Select user...
              </option>
              {followingUsers.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                  disabled={
                    selectedUsers.findIndex((su) => su.id === user.id) !== -1
                  }
                >
                  <Box>
                    <Text>{user.username}</Text>
                  </Box>
                </option>
              ))}
            </Select>
          </Box>
          <Box mt="1em">
            {selectedUsers.map((user) => {
              return (
                <Box
                  key={user.id}
                  display="flex"
                  flexDir={"row"}
                  alignItems="center"
                  mt="0.25em"
                >
                  <Avatar name={user.username} size={"sm"} />
                  <Text ml="0.5em">{user.username}</Text>
                </Box>
              );
            })}
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

const CreateChatModal = ({
  chats,
  chatType,
  modalDisclosure,
}: {
  chats: (ChatPrivate | ChatRoom)[];
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

  // const followingError = result.error;
  // const followingLoading = result.fetching;
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
              chats={
                chats.filter(
                  (c) => c.__typename === "ChatPrivate"
                ) as ChatPrivate[]
              }
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

export interface Props {
  chats: (ChatPrivate | ChatRoom)[];
}

const CreateChat = ({ chats }: Props): JSX.Element => {
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
          chats={chats}
          chatType={selectedChatType}
          modalDisclosure={createChatDisclosure}
        />
      ) : null}
    </>
  );
};

export default CreateChat;
