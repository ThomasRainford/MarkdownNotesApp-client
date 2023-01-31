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
import Create from "../../create/Create";
import NewItemInput from "../../new-item-input/NewItemInput";

const Collections = (): JSX.Element => {
  // TODO: Should get Collections from API.
  const [collections, setCollections] = useState(testCollections);
  const [isAddingNewCollection, setIsAddingNewCollection] = useState(false);
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
                id={`collection-heading-${_collection._id}`}
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
      {/* Display new collection input when adding new collection */}
      {isAddingNewCollection && (
        <NewItemInput
          type="collection"
          confirmAdd={(title: string) => {
            setIsAddingNewCollection(false);
            setCollections([
              ...collections,
              {
                _id: collections[collections.length - 1]._id + 1,
                title,
                upvotes: 0,
                lists: [],
              },
            ]);
          }}
        />
      )}
      {/* Display add collection button when not adding new collection */}
      {!isAddingNewCollection && (
        <Create
          type={"collection"}
          tooltipLabel={"Add Collection"}
          onClick={() => {
            setIsAddingNewCollection(true);
          }}
        />
      )}
    </Box>
  );
};

export default Collections;
