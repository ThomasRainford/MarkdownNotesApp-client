import { AddIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Heading, IconButton, Input, Tag, Text } from "@chakra-ui/react";
import { useState } from "react";
import { SelectedNoteContext } from "../../../../contexts/SelectedNoteContext";
import { getLocalStorageValue } from "../../../../utils/getLocalStorageValue";
import { getTimeSince } from "../../../../utils/getTimeSince";
import { useLocalStorageValue } from "../../../../utils/hooks/useLocalStorageValue";
import {
  LocalStorageContextType,
  LocalStorageKeys,
} from "../../../../utils/types/types";
import NoteEditor from "./note-editor/NoteEditor";

const NoteContentHeaderTitle = ({ title }: { title: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(title);

  return (
    <Box>
      {!isEditing ? (
        <Box display="flex" justifyContent={"space-between"}>
          <Box display="flex">
            <Heading id="note-header-note-title" size={"lg"} mr="0.75em">
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
        <Box display={"flex"}>
          <Input
            mr="0.5em"
            value={editingValue}
            size="md"
            onChange={(e) => {
              setEditingValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
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
            onClick={() => {
              setIsEditing(false);
            }}
          />
        </Box>
      )}
    </Box>
  );
};

const NoteContentHeader = ({
  selectedNote,
  note,
}: {
  selectedNote: any;
  note: any;
}) => {
  return (
    <Box>
      {selectedNote && (
        <Box>
          <NoteContentHeaderTitle title={note.title} />
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
  const [selectedNote] = useLocalStorageValue(
    SelectedNoteContext,
    LocalStorageKeys.SELECTED_NOTE
  ) as LocalStorageContextType;
  const _selectedNote = getLocalStorageValue(selectedNote) as any;
  const note = _selectedNote.note;

  return (
    <Box className="note-content" h={"100%"}>
      {!note ? (
        <Box>No Note Selected...</Box>
      ) : (
        <Box pt={"1em"} px={"1em"} h={"100%"}>
          <NoteContentHeader selectedNote={_selectedNote} note={note} />
          <Box className="node-editor-container" height={"100%"} mt="1.5em">
            <NoteEditor markdownText={note.body} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default NoteContent;
