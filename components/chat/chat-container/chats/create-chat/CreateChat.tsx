import { AddIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Input,
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
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  ChatPrivate,
  ChatRoom,
  useCreateChatPrivateMutation,
  useCreateChatRoomMutation,
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
  const [, createChatPrivate] = useCreateChatPrivateMutation();
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const toast = useToast();
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
                {noChatsUsers.length > 0
                  ? "Select user..."
                  : "No users to select."}
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
        <Button
          colorScheme="blue"
          mr={3}
          disabled={!selectedUser}
          onClick={async () => {
            if (!selectedUser) return;
            const result = await createChatPrivate({
              chatPrivateInput: {
                userId: selectedUser.id,
              },
            });
            const error = result.data?.createChatPrivate.error;
            const data = result.data?.createChatPrivate.chatPrivate;
            if (error) {
              toast({
                id: "create-chat-private-error",
                title: "Failed to create a private chat.",
                status: "error",
                position: "top",
                duration: 2000,
              });
            } else if (data) {
              toast({
                id: "create-chat-private-success",
                title: "Successfully created a new private chat.",
                status: "success",
                position: "top",
                duration: 2000,
              });
            }
            onModalClose();
          }}
        >
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
  const [, createChatRoom] = useCreateChatRoomMutation();
  const [chatRoomName, setChatRoomName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const toast = useToast();
  const [result] = useMeQuery();
  const me = result.data?.me;

  return (
    <>
      <ModalBody>
        <Box>
          <Box>
            <Box mb="0.5em">
              <Box mb="0.5em">
                <Text fontWeight={"bold"}>Enter chat room name:</Text>
              </Box>
              <Input
                placeholder="Chat room name..."
                onChange={(e) => {
                  setChatRoomName(e.target.value);
                }}
              />
            </Box>
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
                Select users...
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
        <Button
          colorScheme="blue"
          mr={3}
          disabled={selectedUsers.length === 0}
          onClick={async () => {
            if (selectedUsers.length === 0) return;
            if (!me) return;
            const result = await createChatRoom({
              chatRoomInput: {
                name: chatRoomName,
                userIds: [...selectedUsers.map((su) => su.id), me?.id],
              },
            });
            const error = result.data?.createChatRoom.error;
            const data = result.data?.createChatRoom.chatRoom;
            if (error) {
              toast({
                id: "create-chat-room-error",
                title: "Failed to create a room chat.",
                status: "error",
                position: "top",
                duration: 2000,
              });
            } else if (data) {
              toast({
                id: "create-chat-room-success",
                title: "Successfully created a new room chat.",
                status: "success",
                position: "top",
                duration: 2000,
              });
            }
            onModalClose();
          }}
        >
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
