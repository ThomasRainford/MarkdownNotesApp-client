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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  useAddNoteMutation,
  useNotesListQuery,
} from "../../../../generated/graphql";
import { handleAddNoteErrors } from "../../../../utils/error-handlers/note-errors";
import { getTimeSince } from "../../../../utils/getTimeSince";
import { useAllLocalStorageValues } from "../../../../utils/hooks/useAllLocalStorageValues";
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
  const toast = useToast();
  const {
    collection: { collection },
    list: { list },
    note: { setSelectedNote },
  } = useAllLocalStorageValues();
  const [notesListResult] = useNotesListQuery({
    variables: {
      listLocation: { collectionId: collection.id, listId: list.id },
    },
  });
  const [, addNote] = useAddNoteMutation();

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
                  setSelectedNote(JSON.stringify(note));
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
          confirmAdd={async (title: string) => {
            const variables = {
              listLocation: {
                collectionId: collection.id,
                listId: list.id,
              },
              noteInput: {
                title,
                body: "",
              },
            };
            const result = await addNote(variables);
            console.log(result);
            const hasError = handleAddNoteErrors(variables, result, toast);
            if (!hasError) setIsAddingNewNote(false);
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
