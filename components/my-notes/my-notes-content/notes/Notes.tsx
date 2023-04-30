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
  Note,
  NotesList,
  useAddNoteMutation,
  useDeleteNoteMutation,
  useNotesListQuery,
} from "../../../../generated/graphql";
import { handleAddNoteErrors } from "../../../../utils/error-handlers/note-errors";
import { getTimeSince } from "../../../../utils/getTimeSince";
import { useAllLocalStorageValues } from "../../../../utils/hooks/useAllLocalStorageValues";
import { setNoteValue } from "../../../../utils/setLocalStorageValue";
import ConfirmModal from "../../../helper/CorfirmModal";
import AddOrCancelAddItem from "../../add-or-cancel-add-item/AddOrCancelAddItem";
import NewItemInput from "../../new-item-input/NewItemInput";

const NoteDeleteButton = ({
  note,
  collectionId,
  notesListId,
}: {
  note: Note;
  collectionId: string;
  notesListId: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    selectedNote: { selectedNote, setSelectedNote },
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
              collectionId: collectionId,
              listId: notesListId,
              noteId: note.id,
            },
          });
          if (result.data?.deleteNote) {
            if (selectedNote?.id === note.id) {
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

export interface Props {
  notes: Note[];
}

const Notes = ({ notes }: Props): JSX.Element => {
  const [isAddingNewNote, setIsAddingNewNote] = useState(false);
  const { colorMode } = useColorMode();
  const toast = useToast();
  const {
    selectedCollection: { selectedCollection },
    selectedNotesList: { selectedList },
    selectedNote: { setSelectedNote },
  } = useAllLocalStorageValues();
  const [notesListResult] = useNotesListQuery({
    variables: {
      listLocation: {
        collectionId: selectedCollection?.id || "",
        listId: selectedList?.id || "",
      },
    },
  });
  const notesList = notesListResult.data?.notesList;
  const [, addNote] = useAddNoteMutation();

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
                  const selectValue = setNoteValue(
                    note,
                    notesList as NotesList
                  );
                  setSelectedNote(JSON.stringify(selectValue));
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
                    collectionId={selectedCollection?.id || ""}
                    notesListId={selectedList?.id || ""}
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
                collectionId: selectedCollection?.id || "",
                listId: selectedList?.id || "",
              },
              noteInput: {
                title,
                body: "# New Note",
              },
            };
            const result = await addNote(variables);
            const hasError = handleAddNoteErrors(variables, result, toast);
            if (!hasError) {
              const selectValue = setNoteValue(
                result.data?.addNote.note as Note,
                notesList as NotesList
              );
              setSelectedNote(JSON.stringify(selectValue));
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
