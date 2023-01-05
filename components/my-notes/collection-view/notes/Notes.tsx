import { Box, Heading, Tag, Text, useColorMode } from "@chakra-ui/react";
import { SelectedListContext } from "../../../../contexts/SelectedListContext";
import { getLocalStorageValue } from "../../../../utils/getLocalStorageValue";
import { getTimeSince } from "../../../../utils/getTimeSince";
import { useLocalStorageValue } from "../../../../utils/hooks/useLocalStorageValue";
import {
  LocalStorageContextType,
  LocalStorageKeys,
} from "../../../../utils/types/types";

const Notes = (): JSX.Element => {
  const { colorMode } = useColorMode();
  const [selectedList] = useLocalStorageValue(
    SelectedListContext,
    LocalStorageKeys.SELECTED_LIST
  ) as LocalStorageContextType;
  const notes = getLocalStorageValue(selectedList).notes;

  return (
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
              pb={"0.5em"}
              _hover={{
                bg: colorMode === "light" ? "gray.200" : "gray.600",
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
  );
};

export default Notes;
