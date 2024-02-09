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
import { GroupBase, Select, SingleValue } from "chakra-react-select";
import { useCallback, useMemo, useState } from "react";
import {
  ChatPrivate,
  ChatRoom,
  Collection,
  useCollectionsQuery,
  useCreatePrivateMessageMutation,
  useCreateRoomMessageMutation,
  useMeQuery,
} from "../../../../../generated/graphql";

type Option = {
  value: Collection;
  label: string;
};

const LinkNoteModal = ({
  isOpen,
  onClose,
  onNoteLink,
}: {
  isOpen: boolean;
  onClose: () => void;
  onNoteLink: (_: string) => void;
}) => {
  const [result] = useCollectionsQuery();
  const data = result.data?.collections;
  const fetching = result.fetching;
  const error = result.error;

  const [selectedOption, setSelectedOption] = useState<
    SingleValue<Option> | undefined
  >(undefined);
  const handleChange = (selectedOption: SingleValue<Option>) => {
    setSelectedOption(selectedOption);
  };

  const notesOptions = useMemo(
    () =>
      data
        ?.flatMap((collection) => {
          return collection.lists.flatMap((list) => {
            return list.notes.map((note) => ({ ...note, collection, list }));
          });
        })
        .map((note) => ({
          value: note.collection,
          label: `${note.list.title} / ${note.title}`,
        })) || [],
    [data]
  );

  const groupedByCategory = useMemo(
    () =>
      Object.values(
        notesOptions.reduce((acc: any, obj) => {
          const key = obj.value.title;
          if (!acc[key]) {
            acc[key] = { label: key, options: [] };
          }
          acc[key].options.push({ value: obj.value, label: obj.label });
          return acc;
        }, {})
      ) as unknown as GroupBase<Option>[],
    [notesOptions]
  );

  const filterOption = useCallback(
    ({ label, value }: Option, inputValue: string) => {
      // default search
      if (
        label.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()) ||
        value.title.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
      )
        return true;
      // check if a group as the filter string as label
      const groupOptions = groupedByCategory.filter((group) =>
        group.label?.toLocaleLowerCase().includes(inputValue)
      );
      if (groupOptions) {
        for (const groupOption of groupOptions) {
          // Check if current option is in group
          const option = groupOption.options.find(
            (opt) => opt.value.id === value.id
          );
          if (option) {
            return true;
          }
        }
      }
      return false;
    },
    [groupedByCategory]
  );

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
                // react-select doesn't like the Option 'value'
                // being something other than a string.
                filterOption={filterOption as any}
                options={groupedByCategory}
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
          <Button
            variant="solid"
            colorScheme={"blue"}
            onClick={() => {
              onNoteLink(
                `${selectedOption?.value.title} / ${
                  selectedOption?.label || ""
                }`
              );
              onClose();
            }}
          >
            Link
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const MoreActionsButton = ({
  onNoteLink,
}: {
  onNoteLink: (_: string) => void;
}) => {
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
      <LinkNoteModal
        isOpen={isOpen}
        onClose={onClose}
        onNoteLink={onNoteLink}
      />
    </>
  );
};

const MessageInputButtons = ({
  onMessageSend,
  onNoteLink,
  messageSendLoading,
  inputValue,
}: {
  onMessageSend: () => void;
  onNoteLink: (_: string) => void;
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
        <MoreActionsButton onNoteLink={onNoteLink} />
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
  const [me] = useMeQuery();
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
        onNoteLink={(note) => {
          // TODO: Need to set selected collection, list and note in localstorage.
          setInputValue((value) => {
            if (!me.data?.me) return value;
            return `${value} \\\n Note Link \n >[${note}](notes/${me.data?.me?.username})`;
          });
        }}
        messageSendLoading={messageSendLoading}
        inputValue={inputValue}
      />
    </>
  );
};

export default MessageInput;
