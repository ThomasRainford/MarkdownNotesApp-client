import { Box, Heading, Tag, Text, useColorMode } from "@chakra-ui/react";
import { SelectedCollectionContext } from "../../../../contexts/SelectedCollectionContext";
import { SelectedListContext } from "../../../../contexts/SelectedListContext";
import { SelectedNoteContext } from "../../../../contexts/SelectedNoteContext";
import { getLocalStorageValue } from "../../../../utils/getLocalStorageValue";
import { getTimeSince } from "../../../../utils/getTimeSince";
import { useLocalStorageValue } from "../../../../utils/hooks/useLocalStorageValue";
import {
  LocalStorageContextType,
  LocalStorageKeys,
} from "../../../../utils/types/types";
import Create from "../../create/Create";

const Notes = (): JSX.Element => {
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
  const notes = getLocalStorageValue(selectedList).notes;
  const list = getLocalStorageValue(selectedList);
  const collection = getLocalStorageValue(selectedCollection);

  return (
    <Box>
      <Box>
        {!notes ? null : (
          <>
            {notes.map((note: any) => (
              <Box
                key={note._id}
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
                      id={`note-heading-${note._id}`}
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
              </Box>
            ))}
          </>
        )}
      </Box>
      <Create type={"note"} tooltipLabel={"Add Note"} onClick={() => {}} />
    </Box>
  );
};

export default Notes;
