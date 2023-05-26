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
import { useEffect, useState } from "react";
import {
  Collection,
  Note,
  useCollectionsQuery,
  useUpdateNoteMutation,
} from "../../../../generated/graphql";
import { getTimeSince } from "../../../../utils/getTimeSince";
import { useAllLocalStorageValues } from "../../../../utils/hooks/useAllLocalStorageValues";
import { useHandleCrossEditing } from "../../../../utils/hooks/useHandleCrossEditing";
import { useUpdateItem } from "../../../../utils/hooks/useUpdateItem";
import NoteEditor from "./note-editor/NoteEditor";

const NoteContentHeaderTitle = ({ note }: { note: Note }) => {
  const [collectionsResult] = useCollectionsQuery();
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(note?.title);
  const [, updateNote] = useUpdateNoteMutation();
  const [updateItem] = useUpdateItem();
  const collections = collectionsResult.data?.collections as Collection[];
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

const NoteContentHeader = ({ note }: { note: Note }) => {
  return (
    <Box>
      {note && (
        <Box>
          <NoteContentHeaderTitle note={note} />
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

const NoteContent = (): JSX.Element => {
  const [collectionsResult] = useCollectionsQuery();
  const {
    selectedNote: { selectedNote },
  } = useAllLocalStorageValues();

  const note: Note | undefined = collectionsResult.data?.collections
    .find((c) => c.id === selectedNote?.collectionId)
    ?.lists.find((l) => l.id === selectedNote?.notesListId)
    ?.notes.find((n) => n.id === selectedNote?.id);

  return (
    <Box className="note-content" h={"100%"}>
      {!note ? (
        <Box>No Note Selected...</Box>
      ) : (
        <Box pt={"0.75em"} px={"1em"} h={"100%"}>
          <NoteContentHeader note={note} />
          <Box className="node-editor-container" height={"100%"} mt="1.5em">
            <NoteEditor note={note} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default NoteContent;
