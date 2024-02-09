import { AddIcon, ArrowRightIcon, LinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { Select, SingleValue } from "chakra-react-select";
import { useState } from "react";
import {
  ChatPrivate,
  ChatRoom,
  useCollectionsQuery,
  useCreatePrivateMessageMutation,
  useCreateRoomMessageMutation,
} from "../../../../../generated/graphql";

const LinkNoteModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [result] = useCollectionsQuery();
  const data = result.data?.collections;
  const fetching = result.fetching;
  const error = result.error;

  const [selectedOption, setSelectedOption] = useState<
    | SingleValue<{
        value: string;
        label: string;
      }>
    | undefined
  >(undefined);
  const handleChange = (
    selectedOption: SingleValue<{
      value: string;
      label: string;
    }>
  ) => {
    setSelectedOption(selectedOption);
  };

  const notesOptions =
    data
      ?.flatMap((collection) => {
        return collection.lists.flatMap((list) => {
          return list.notes.map((note) => ({ ...note, collection, list }));
        });
      })
      .map((note) => ({
        value: note.id,
        label: `${note.collection.title} / ${note.list.title} / ${note.title}`,
      })) || [];

  //console.log(notesOptions);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Link Note</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {fetching ? (
            <Spinner />
          ) : error ? (
            "Could not get notes."
          ) : (
            <Box>
              <Select
                value={selectedOption}
                onChange={(option) => {
                  handleChange(option);
                }}
                options={notesOptions}
                isSearchable={true}
                placeholder="Select a note..."
              />
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant={"outline"} mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="solid" colorScheme={"blue"}>
            Link
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const MoreActionsButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<AddIcon />}
          variant="outline"
          aria-label="Open message menu"
          color={"teal.400"}
        />
        <MenuList>
          <MenuItem
            icon={<LinkIcon />}
            onClick={() => {
              onOpen();
            }}
          >
            Link Note
          </MenuItem>
        </MenuList>
      </Menu>
      <LinkNoteModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

const MessageInputButtons = ({
  onMessageSend,
  messageSendLoading,
  inputValue,
}: {
  onMessageSend: () => void;
  messageSendLoading: boolean;
  inputValue: string;
}) => {
  return (
    <Box display="flex" flexGrow={1} mb="0.15em">
      <Box
        display={"flex"}
        flexDir="column"
        justifyContent={"space-between"}
        alignItems="center"
        w="100%"
      >
        <MoreActionsButton />
        <IconButton
          variant={"solid"}
          icon={<ArrowRightIcon />}
          color="gray.300"
          float="left"
          bg={"blue.600"}
          disabled={inputValue === ""}
          aria-label={"Send message button"}
          onClick={() => {
            onMessageSend();
          }}
          isLoading={messageSendLoading}
        />
      </Box>
    </Box>
  );
};

export interface Props {
  chat: ChatPrivate | ChatRoom;
}

const MessageInput = ({ chat }: Props): JSX.Element => {
  const [inputValue, setInputValue] = useState("");
  const [createPrivateMessageResult, createPrivateMessage] =
    useCreatePrivateMessageMutation();
  const [createRoomMessageResult, createRoomMessage] =
    useCreateRoomMessageMutation();

  const chatType = chat.__typename;
  const create =
    chatType === "ChatPrivate" ? createPrivateMessage : createRoomMessage;

  const messageSendLoading =
    createPrivateMessageResult.fetching || createRoomMessageResult.fetching;

  return (
    <>
      <Box flexGrow={10}>
        <Textarea
          resize={"none"}
          rows={3}
          bg="gray.700"
          placeholder="Type your message here..."
          value={inputValue}
          onChange={(e) => {
            if (messageSendLoading) return;
            setInputValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.shiftKey && e.key === "Enter") {
              create({
                createMessageInput: {
                  chatId: chat.id,
                  content: inputValue,
                },
              });
              setInputValue("");
            }
          }}
        />
      </Box>
      <MessageInputButtons
        onMessageSend={() => {
          if (inputValue === "") return;
          create({
            createMessageInput: {
              chatId: chat.id,
              content: inputValue,
            },
          });
          setInputValue("");
        }}
        messageSendLoading={messageSendLoading}
        inputValue={inputValue}
      />
    </>
  );
};

export default MessageInput;
