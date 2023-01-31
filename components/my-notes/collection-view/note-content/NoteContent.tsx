import { Box, Heading, Tag, Text } from "@chakra-ui/react";
import { SelectedNoteContext } from "../../../../contexts/SelectedNoteContext";
import { getLocalStorageValue } from "../../../../utils/getLocalStorageValue";
import { getTimeSince } from "../../../../utils/getTimeSince";
import { useLocalStorageValue } from "../../../../utils/hooks/useLocalStorageValue";
import {
  LocalStorageContextType,
  LocalStorageKeys,
} from "../../../../utils/types/types";
import NoteEditor from "./note-editor/NoteEditor";

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
          <Box>
            <Heading id="note-header-note-title" size={"lg"}>
              {note.title}
            </Heading>
          </Box>
          <Box display={"flex"} alignItems="center" mt="1em">
            <Box mr={"0.5em"}>
              <Text>Last Modified</Text>
            </Box>
            <Box mr={"0.5em"}>
              <Tag
                id="note-header-last-modified"
                variant={"outline"}
                size={"md"}
                mt="3px"
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
  const _selectedNote = getLocalStorageValue(selectedNote);
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
