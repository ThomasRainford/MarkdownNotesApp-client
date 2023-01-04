import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Heading, Tag, useColorMode } from "@chakra-ui/react";
import { SelectedCollectionContext } from "../../../../../contexts/SelectedCollectionContext";
import { SelectedListContext } from "../../../../../contexts/SelectedListContext";
import { useLocalStorageValue } from "../../../../../utils/hooks/useLocalStorageValue";
import {
  LocalStorageContextType,
  LocalStorageKeys,
} from "../../../../../utils/types/types";

const Lists = (): JSX.Element => {
  const { colorMode } = useColorMode();
  const [selectedCollection] = useLocalStorageValue(
    SelectedCollectionContext,
    LocalStorageKeys.SELECTED_COLLECTION
  ) as LocalStorageContextType;
  const [, setSelectedList] = useLocalStorageValue(
    SelectedListContext,
    LocalStorageKeys.SELECTED_LIST
  ) as LocalStorageContextType;
  const collection =
    typeof selectedCollection === "string"
      ? JSON.parse(selectedCollection)
      : selectedCollection;
  const lists = collection?.lists;

  return (
    <Box>
      {!lists ? null : (
        <>
          {lists.map((list: any) => {
            const notes = list.notes;
            return (
              <Box
                key={list._id}
                display={"flex"}
                justifyContent={"space-between"}
                pl={"1.5em"}
                pr={"1em"}
                pt={"1em"}
                pb={"1em"}
                _hover={{
                  bg: colorMode === "light" ? "gray.200" : "gray.600",
                }}
                onClick={() => setSelectedList(JSON.stringify(list))}
              >
                <Box display={"flex"}>
                  <Heading
                    id="list-heading"
                    as="h4"
                    size={"md"}
                    pr={"1em"}
                    color={colorMode === "light" ? "gray.600" : "gray.300"}
                  >
                    {list.title}
                  </Heading>
                  <Tag>{notes.length}</Tag>
                </Box>
                <Box>
                  <ArrowForwardIcon
                    boxSize={6}
                    color={colorMode === "light" ? "gray.700" : "gray.500"}
                  />
                </Box>
              </Box>
            );
          })}
        </>
      )}
    </Box>
  );
};

export default Lists;
