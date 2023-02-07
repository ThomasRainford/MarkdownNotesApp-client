import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { SelectedCollectionContext } from "../../../../contexts/SelectedCollectionContext";
import { SelectedListContext } from "../../../../contexts/SelectedListContext";
import { SelectedNoteContext } from "../../../../contexts/SelectedNoteContext";
import { useNotesListQuery } from "../../../../generated/graphql";
import { getLocalStorageValue } from "../../../../utils/getLocalStorageValue";
import { getTimeSince } from "../../../../utils/getTimeSince";
import { useLocalStorageValue } from "../../../../utils/hooks/useLocalStorageValue";
import {
  LocalStorageContextType,
  LocalStorageKeys,
} from "../../../../utils/types/types";
import AddOrCancelAddItem from "../../add-or-cancel-add-item/AddOrCancelAddItem";
import NewItemInput from "../../new-item-input/NewItemInput";

const NoteDeleteButton = ({ note }: { note: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        colorScheme="red"
        variant={"outline"}
        size={"xs"}
        aria-label={`delete-note`}
        icon={<DeleteIcon boxSize={3} />}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Note?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete <Text as="b">{note.title}</Text>
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="solid" colorScheme={"red"} onClick={() => {}}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const Notes = (): JSX.Element => {
  const [isAddingNewNote, setIsAddingNewNote] = useState(false);
  const { colorMode } = useColorMode();
  const [selectedCollection] = useLocalStorageValue(
    SelectedCollectionContext,
    LocalStorageKeys.SELECTED_COLLECTION
  ) as LocalStorageContextType;
  const [selectedList] = useLocalStorageValue(
    SelectedListContext,
    LocalStorageKeys.SELECTED_LIST
  ) as LocalStorageContextType;
  const [, setSelecteNote] = useLocalStorageValue(
    SelectedNoteContext,
    LocalStorageKeys.SELECTED_NOTE
  ) as LocalStorageContextType;
  const collection = getLocalStorageValue(selectedCollection);
  const list = getLocalStorageValue(selectedList);

  const [notesListResult] = useNotesListQuery({
    variables: {
      listLocation: { collectionId: collection.id, listId: list.id },
    },
  });
  const notes = notesListResult.data?.notesList?.notes;

  return (
    <Box>
      <Box>
        {!notes ? null : (
          <>
            {notes.map((note) => (
              <Box
                key={note.id}
                display={"flex"}
                justifyContent={"space-between"}
                pl={"1em"}
                pr={"1em"}
                pt={"0.5em"}
                pb={"0.7em"}
                _hover={{
                  bg: colorMode === "light" ? "gray.200" : "gray.600",
                }}
                onClick={() => {
                  setSelecteNote(
                    JSON.stringify({
                      note,
                      list,
                      collection,
                    })
                  );
                }}
              >
                <Box>
                  <Box mb={"0.95em"}>
                    <Heading
                      id={`note-heading-${note.id}`}
                      as="h4"
                      size={"md"}
                      pr={"1em"}
                      color={colorMode === "light" ? "gray.600" : "gray.300"}
                    >
                      {note.title}
                    </Heading>
                  </Box>
                  <Box mb={"0.9em"}>
                    <Tag size={"sm"}>
                      {getTimeSince(new Date(note.updatedAt))}
                    </Tag>
                  </Box>
                  <Box>
                    <Text fontSize={"sm"}>
                      {(note.body as string).substring(0, 15)}
                    </Text>
                  </Box>
                </Box>
                <Box>
                  <NoteDeleteButton note={note} />
                </Box>
              </Box>
            ))}
          </>
        )}
      </Box>
      {isAddingNewNote && (
        <NewItemInput
          type="note"
          confirmAdd={(title: string) => {
            setIsAddingNewNote(false);
          }}
        />
      )}
      {!isAddingNewNote ? (
        <AddOrCancelAddItem
          type={"note"}
          tooltipLabel={"Add Note"}
          onClick={() => {
            setIsAddingNewNote(true);
          }}
          iconType={"add"}
        />
      ) : (
        <AddOrCancelAddItem
          type={"note"}
          tooltipLabel={"Cancel"}
          onClick={() => {
            setIsAddingNewNote(false);
          }}
          iconType={"cancel"}
        />
      )}
    </Box>
  );
};

export default Notes;
