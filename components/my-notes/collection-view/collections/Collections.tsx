import { Box, Heading, Tag, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import { SelectedCollectionContext } from "../../../../contexts/SelectedCollectionContext";
import { SelectedListContext } from "../../../../contexts/SelectedListContext";
import { testCollections } from "../../../../test-utils/testData";
import { getLocalStorageValue } from "../../../../utils/getLocalStorageValue";
import { useLocalStorageValue } from "../../../../utils/hooks/useLocalStorageValue";
import {
  LocalStorageContextType,
  LocalStorageKeys,
} from "../../../../utils/types/types";

const Collections = (): JSX.Element => {
  const [collections] = useState(testCollections);
  const { colorMode } = useColorMode();
  const [selectedCollection, setSelectedCollection] = useLocalStorageValue(
    SelectedCollectionContext,
    LocalStorageKeys.SELECTED_COLLECTION
  ) as LocalStorageContextType;
  const [, setSelectedList] = useLocalStorageValue(
    SelectedListContext,
    LocalStorageKeys.SELECTED_LIST
  ) as LocalStorageContextType;
  const collection = getLocalStorageValue(selectedCollection);

  return (
    <Box>
      {collections.map((_collection) => {
        const lists = _collection.lists;
        return (
          <Box
            key={_collection._id}
            display={"flex"}
            justifyContent="space-between"
            pl={"1.5em"}
            pr={"1em"}
            pt={"1em"}
            pb={"1em"}
            _hover={{
              bg: colorMode === "light" ? "gray.200" : "gray.600",
            }}
            border={"1px"}
            borderColor={
              _collection._id === collection?._id ? "gray.200" : "gray.800"
            }
            onClick={() => {
              setSelectedCollection(JSON.stringify(_collection));
              setSelectedList("");
            }}
          >
            <Heading
              id={`collection-header-${_collection._id}`}
              as="h4"
              size={"md"}
              color={colorMode === "light" ? "gray.700" : "gray.300"}
            >
              {_collection.title}
            </Heading>
            <Tag>{lists.length}</Tag>
          </Box>
        );
      })}
    </Box>
  );
};

export default Collections;
