import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  IconButton,
  Tag,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  Collection,
  Note,
  NotesList,
  useAddNoteMutation,
  useDeleteNoteMutation,
  useNotesListQuery,
} from "../../../../generated/graphql";
import { handleAddNoteErrors } from "../../../../utils/error-handlers/note-errors";
import { getTimeSince } from "../../../../utils/getTimeSince";
import { useAllLocalStorageValues } from "../../../../utils/hooks/useAllLocalStorageValues";
import ConfirmModal from "../../../helper/CorfirmModal";
import AddOrCancelAddItem from "../../add-or-cancel-add-item/AddOrCancelAddItem";
import NewItemInput from "../../new-item-input/NewItemInput";

const NoteDeleteButton = ({
  note,
  collection,
  notesList,
}: {
  note: Note;
  collection: Collection;
  notesList: NotesList;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    note: { note: selectedNote, setSelectedNote },
  } = useAllLocalStorageValues();

  const [, deleteNote] = useDeleteNoteMutation();

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
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        headerText={"Delete Note?"}
        bodyContent={
          <Text>
            Are you sure you want to delete <Text as="b">{note.title}</Text>
          </Text>
        }
        closeText={"Cancel"}
        confirmText={"Delete"}
        toastText={{
          success: `Successfully deleted ${note.title}.`,
          error: `Failed to delete ${note.title}.`,
        }}
        onConfirm={async () => {
          const result = await deleteNote({
            noteLocation: {
              collectionId: collection.id,
              listId: notesList.id,
              noteId: note.id,
            },
          });
          if (result.data?.deleteNote) {
            if (selectedNote.id === note.id) {
              setSelectedNote("");
            }
            return true;
          } else {
            return false;
          }
        }}
      />
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
                  <NoteDeleteButton
                    note={note}
                    collection={collection}
                    notesList={list}
                  />
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
                body: "# New Note",
              },
            };
            const result = await addNote(variables);
            const hasError = handleAddNoteErrors(variables, result, toast);
            if (!hasError) {
              setSelectedNote(JSON.stringify(result.data?.addNote.note));
              setIsAddingNewNote(false);
            }
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
