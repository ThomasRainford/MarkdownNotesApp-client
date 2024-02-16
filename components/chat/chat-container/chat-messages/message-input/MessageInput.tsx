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
  Note,
  NotesList,
  useCollectionsQuery,
  useCreatePrivateMessageMutation,
  useCreateRoomMessageMutation,
  useMeQuery,
} from "../../../../../generated/graphql";

type NoteWithParents = Note & { collection: Collection; list: NotesList };
type CollectionInfo = Pick<Collection, "id" | "title">;

type CopyNoteOption = {
  value: NoteWithParents;
  label: string;
};
type SendCollectionOption = {
  value: string;
  label: string;
};

const CopyNoteModal = ({
  isOpen,
  onClose,
  onNoteCopy,
}: {
  isOpen: boolean;
  onClose: () => void;
  onNoteCopy: (_: NoteWithParents) => void;
}) => {
  const [result] = useCollectionsQuery();
  const data = result.data?.collections;
  const fetching = result.fetching;
  const error = result.error;

  const [selectedOption, setSelectedOption] = useState<
    SingleValue<CopyNoteOption> | undefined
  >(undefined);
  const handleChange = (selectedOption: SingleValue<CopyNoteOption>) => {
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
          value: note,
          label: `${note.list.title} / ${note.title}`,
        })) || [],
    [data]
  );

  const groupedByCategory = useMemo(
    () =>
      Object.values(
        notesOptions.reduce((acc: any, obj) => {
          const key = obj.value.collection.title;
          if (!acc[key]) {
            acc[key] = { label: key, options: [] };
          }
          acc[key].options.push({ value: obj.value, label: obj.label });
          return acc;
        }, {})
      ) as unknown as GroupBase<CopyNoteOption>[],
    [notesOptions]
  );

  const filterOption = useCallback(
    ({ label, value }: CopyNoteOption, inputValue: string) => {
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
        <ModalHeader>Copy Note</ModalHeader>
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
              if (selectedOption) onNoteCopy(selectedOption.value);
              onClose();
            }}
          >
            Copy & Paste
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const SendCollectionModal = ({
  isOpen,
  onClose,
  onCollectionToSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCollectionToSave: (_: CollectionInfo) => void;
}) => {
  const [result] = useCollectionsQuery();
  const data = result.data?.collections;
  const fetching = result.fetching;
  const error = result.error;

  const [selectedOption, setSelectedOption] = useState<
    SingleValue<SendCollectionOption> | undefined
  >(undefined);

  const handleChange = (selectedOption: SingleValue<SendCollectionOption>) => {
    setSelectedOption(selectedOption);
  };

  const options =
    data
      ?.filter((collection) => collection.visibility === "public")
      .map((collection) => ({
        label: collection.title,
        value: collection.id,
      })) || [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Send Collection</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {fetching ? (
            <Spinner />
          ) : error ? (
            "Could not get collections."
          ) : (
            <Box>
              <Select
                value={selectedOption}
                onChange={(option) => {
                  handleChange(option);
                }}
                //filterOption={() => {}}
                options={options}
                isSearchable={true}
                placeholder="Select a collection..."
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
              if (selectedOption)
                onCollectionToSave({
                  id: selectedOption.value,
                  title: selectedOption.label,
                });
              onClose();
            }}
          >
            Send Collection
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const MoreActionsButton = ({
  onNoteCopy,
  onCollectionToSave,
}: {
  onNoteCopy: (_: NoteWithParents) => void;
  onCollectionToSave: (_: CollectionInfo) => void;
}) => {
  const onNoteCopyDisclosure = useDisclosure();
  const onCollectionToSaveDisclosure = useDisclosure();

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
              onNoteCopyDisclosure.onOpen();
            }}
          >
            Copy Note
          </MenuItem>
          <MenuItem
            icon={<LinkIcon />}
            onClick={() => {
              onCollectionToSaveDisclosure.onOpen();
            }}
          >
            Send Collection
          </MenuItem>
        </MenuList>
      </Menu>
      <CopyNoteModal
        isOpen={onNoteCopyDisclosure.isOpen}
        onClose={onNoteCopyDisclosure.onClose}
        onNoteCopy={onNoteCopy}
      />
      <SendCollectionModal
        isOpen={onCollectionToSaveDisclosure.isOpen}
        onClose={onCollectionToSaveDisclosure.onClose}
        onCollectionToSave={onCollectionToSave}
      />
    </>
  );
};

const MessageInputButtons = ({
  onMessageSend,
  onNoteCopy,
  onCollectionToSave,
  messageSendLoading,
  inputValue,
}: {
  onMessageSend: () => void;
  onNoteCopy: (_: NoteWithParents) => void;
  onCollectionToSave: (_: CollectionInfo) => void;
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
        <MoreActionsButton
          onNoteCopy={onNoteCopy}
          onCollectionToSave={onCollectionToSave}
        />
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
        onNoteCopy={(note) => {
          const noteLocationText = `${note.collection.title}/${note.list.title}/${note.title}`;
          setInputValue((value) => {
            if (!me.data?.me) return value;
            return `${value} \\\n **${noteLocationText}:** \\\n\\\n ${note.body} `;
          });
        }}
        onCollectionToSave={(collectionInfo) => {
          if (!collectionInfo || !collectionInfo.id || !collectionInfo.title)
            return;
          console.log("info to save", collectionInfo);
          setInputValue((value) => {
            if (!me.data?.me) return value;
            const buttonText = `::save-collection-button[Save]{userId=${me.data?.me?.id} collectionId=${collectionInfo.id}}`;
            return `${value} \\\n **Click 'Save' to save the collection ${collectionInfo.title}:**\\\n${buttonText}`;
          });
        }}
        messageSendLoading={messageSendLoading}
        inputValue={inputValue}
      />
    </>
  );
};

export default MessageInput;
