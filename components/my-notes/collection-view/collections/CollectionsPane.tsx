import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  IconButton,
  Tag,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { SelectedCollectionContext } from "../../../../contexts/SelectedCollectionContext";
import { SelectedListContext } from "../../../../contexts/SelectedListContext";
import { testCollections } from "../../../../test-utils/testData";
import { useLocalStorageValue } from "../../../../utils/hooks/useLocalStorageValue";
import {
  LocalStorageContextType,
  LocalStorageKeys,
} from "../../../../utils/types/types";

const CollectionsPane = (): JSX.Element => {
  const [collections] = useState(testCollections);
  const [, setSelectedCollection] = useLocalStorageValue(
    SelectedCollectionContext,
    LocalStorageKeys.SELECTED_COLLECTION
  ) as LocalStorageContextType;
  const [, setSelectedList] = useLocalStorageValue(
    SelectedListContext,
    LocalStorageKeys.SELECTED_LIST
  ) as LocalStorageContextType;

  const { colorMode } = useColorMode();

  return (
    <Box h={"100%"} backgroundColor={useColorModeValue("gray.400", "gray.800")}>
      <Box h={"50px"}></Box>
      <Box
        display={"flex"}
        justifyContent="space-between"
        px={"1em"}
        py={"1em"}
      >
        <Heading
          id="collection-heading"
          as="h3"
          size={"lg"}
          fontWeight="normal"
          textColor={useColorModeValue("gray.700", "gray.400")}
        >
          Collections
        </Heading>
        <Box display={"flex"} alignItems={"center"}>
          <IconButton
            colorScheme="teal"
            variant={"ghost"}
            aria-label="Search database"
            icon={<AddIcon boxSize={5} />}
          />
        </Box>
      </Box>

      {collections.map((collection) => {
        const lists = collection.lists;
        return (
          <Box
            key={collection._id}
            display={"flex"}
            justifyContent="space-between"
            pl={"1.5em"}
            pr={"1em"}
            pt={"1em"}
            pb={"1em"}
            _hover={{
              bg: colorMode === "light" ? "gray.200" : "gray.600",
            }}
            onClick={() => {
              setSelectedCollection(JSON.stringify(collection));
              setSelectedList("");
            }}
          >
            <Heading
              id={`collection-header-${collection._id}`}
              as="h4"
              size={"md"}
              color={colorMode === "light" ? "gray.700" : "gray.300"}
            >
              {collection.title}
            </Heading>
            <Tag>{lists.length}</Tag>
          </Box>
        );
      })}
    </Box>
  );
};

export default CollectionsPane;
