import { AddIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  IconButton,
  Input,
  Tag,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import {
  Collection,
  Note,
  useUpdateNoteMutation,
} from "../../../../generated/graphql";
import { getTimeSince } from "../../../../utils/getTimeSince";
import { useAllLocalStorageValues } from "../../../../utils/hooks/useAllLocalStorageValues";
import { useHandleCrossEditing } from "../../../../utils/hooks/useHandleCrossEditing";
import { useUpdateItem } from "../../../../utils/hooks/useUpdateItem";
import NoteEditor from "./note-editor/NoteEditor";

const NoteContentHeaderTitle = ({
  isMe,
  note,
  collections,
}: {
  isMe: boolean;
  note: Note;
  collections: Collection[];
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(note?.title);
  const [, updateNote] = useUpdateNoteMutation();
  const [updateItem] = useUpdateItem();
  const handelCrossEditing = useHandleCrossEditing({ collections });
  const {
    selectedNote: { selectedNote },
  } = useAllLocalStorageValues();
  const { colorMode } = useColorMode();

  const collection = collections?.find(
    (collection) => collection.id === selectedNote?.collectionId
  );
  const notesList = collection?.lists.find(
    (list) => list.id === selectedNote?.notesListId
  );

  useEffect(() => {
    setEditingValue(note?.title);
  }, [note?.title]);

  const update = () => {
    const { notesCollection, notesNotesList } = handelCrossEditing();
    return updateItem(
      "note",
      {
        noteLocation: {
          collectionId: notesCollection?.id || "",
          listId: notesNotesList?.id || "",
          noteId: note?.id || "",
        },
        noteInput: {
          title: editingValue,
        },
      },
      updateNote
    );
  };

  return (
    <Box>
      {!isEditing ? (
        <Box display="flex" justifyContent={"space-between"}>
          <Box display="flex" alignItems={"center"}>
            <Heading
              size={"sm"}
              color={colorMode === "light" ? "gray.500" : "gray.300"}
            >
              {collection?.title} /
            </Heading>
            <Heading
              size={"sm"}
              color={colorMode === "light" ? "gray.500" : "gray.300"}
              ml="0.2em"
            >
              {notesList?.title} /
            </Heading>
            <Heading
              id="note-header-note-title"
              size={"lg"}
              ml="0.3em"
              mr="0.75em"
            >
              {editingValue}
            </Heading>
          </Box>
          {isMe && (
            <Box display="flex">
              <IconButton
                colorScheme="blue"
                size={"md"}
                variant={"outline"}
                aria-label={`update-note-title`}
                icon={<EditIcon boxSize={4} />}
                onClick={() => {
                  setIsEditing(true);
                }}
              />
            </Box>
          )}
        </Box>
      ) : (
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box display={"flex"} alignItems={"center"}>
            <Heading
              size={"sm"}
              color={colorMode === "light" ? "gray.500" : "gray.300"}
            >
              {collection?.title} /
            </Heading>
            <Heading
              size={"sm"}
              color={colorMode === "light" ? "gray.500" : "gray.300"}
              ml="0.2em"
            >
              {notesList?.title} /
            </Heading>
          </Box>
          <Box display={"flex"} flexGrow="2" ml="0.5em">
            <Input
              mr="0.5em"
              value={editingValue}
              size="md"
              w="100%"
              onChange={(e) => {
                setEditingValue(e.target.value);
              }}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  await update();
                  setIsEditing(false);
                }
              }}
            />
            <IconButton
              mr="0.5em"
              colorScheme="red"
              size={"md"}
              variant={"ghost"}
              aria-label={`close-update-note-title`}
              icon={<CloseIcon boxSize={3} />}
              onClick={() => {
                setIsEditing(false);
              }}
            />
            <IconButton
              colorScheme="blue"
              size={"md"}
              variant={"outline"}
              aria-label={`update-note-title`}
              icon={<AddIcon boxSize={3} />}
              onClick={async () => {
                await update();
                setIsEditing(false);
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

const NoteContentHeader = ({
  isMe,
  note,
  collections,
}: {
  isMe: boolean;
  note: Note;
  collections: Collection[];
}) => {
  return (
    <Box>
      {note && (
        <Box>
          <NoteContentHeaderTitle
            isMe={isMe}
            note={note}
            collections={collections}
          />
          <Box display={"flex"} alignItems="center" mt="1em">
            <Box mr={"0.5em"}>
              <Text>Last Modified</Text>
            </Box>
            <Box mr={"0.5em"}>
              <Tag
                id="note-header-last-modified"
                variant={"outline"}
                size={"md"}
                mt="1px"
                colorScheme={"teal"}
              >
                {getTimeSince(new Date(note.updatedAt))}
              </Tag>
            </Box>
            <Box mr={"0.5em"}>ago</Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export interface Props {
  isMe: boolean;
  userCollectionsData: Collection[];
}

const NoteContent = ({ isMe, userCollectionsData }: Props): JSX.Element => {
  const {
    selectedNote: { selectedNote },
  } = useAllLocalStorageValues();

  const collection = userCollectionsData.find(
    (c) => c.id === selectedNote?.collectionId
  );

  const note: Note | undefined = useMemo(
    () =>
      collection?.lists
        .find((l) => l.id === selectedNote?.notesListId)
        ?.notes.find((n) => n.id === selectedNote?.id),
    // Dont want to update note when collections changes as this will
    // reset the inital text in the editor causing the editor to go inactive.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedNote?.id, selectedNote?.notesListId]
  );

  return (
    <Box className="note-content" h={"100%"}>
      {!note ? (
        <Box>No Note Selected...</Box>
      ) : (
        <Box pt={"0.75em"} px={"1em"} h={"100%"}>
          <NoteContentHeader
            isMe={isMe}
            note={note}
            collections={userCollectionsData}
          />
          <Box className="node-editor-container" height={"100%"} mt="1.5em">
            <NoteEditor note={note} readOnly={!isMe} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default NoteContent;
