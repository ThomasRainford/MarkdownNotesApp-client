import { Box, Heading, Tag, Text, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SelectedCollectionContext } from "../../../../contexts/SelectedCollectionContext";
import { SelectedListContext } from "../../../../contexts/SelectedListContext";
import { SelectedNoteContext } from "../../../../contexts/SelectedNoteContext";
import { testCollections } from "../../../../test-utils/testData";
import { getLocalStorageValue } from "../../../../utils/getLocalStorageValue";
import { getTimeSince } from "../../../../utils/getTimeSince";
import { useLocalStorageValue } from "../../../../utils/hooks/useLocalStorageValue";
import {
  LocalStorageContextType,
  LocalStorageKeys,
} from "../../../../utils/types/types";
import Create from "../../create/Create";
import NewItemInput from "../../new-item-input/NewItemInput";

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

  // TODO: Should get Lists from API.
  const [notes, setNotes] = useState(
    testCollections
      .find((c) => c._id === collection._id)
      ?.lists.find((l) => l._id === list._id)?.notes
  );
  useEffect(() => {
    setNotes(
      testCollections
        .find((c) => c._id === collection._id)
        ?.lists.find((l) => l._id === list._id)?.notes
    );
  }, [JSON.stringify(list)]);

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
      {isAddingNewNote && (
        <NewItemInput
          type="note"
          confirmAdd={(title: string) => {
            setIsAddingNewNote(false);
            setNotes([
              ...(notes || []),
              {
                _id: !notes ? 1 : notes[notes.length - 1]._id + 1,
                title,
                body: "",
                updatedAt: new Date().toISOString(),
              },
            ]);
          }}
        />
      )}
      {!isAddingNewNote && (
        <Create
          type={"note"}
          tooltipLabel={"Add Note"}
          onClick={() => {
            setIsAddingNewNote(true);
          }}
        />
      )}
    </Box>
  );
};

export default Notes;
