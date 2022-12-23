import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  IconButton,
  Tag,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { SelectedCollectionContext } from "../../../../contexts/SelectedCollectionContext";
import { testCollections } from "../../../../test-utils/testData";
import { useLocalStorageValue } from "../../../../utils/hooks/useLocalStorageValue";
import {
  LocalStorageContextType,
  LocalStorageKeys,
} from "../../../../utils/types/types";

const Collections = (): JSX.Element => {
  const [collections] = useState(testCollections);
  const [, setSelectedCollection] = useLocalStorageValue(
    SelectedCollectionContext,
    LocalStorageKeys.SELECTED_COLLECTION
  ) as LocalStorageContextType;

  return (
    <Box h={"100%"} backgroundColor={useColorModeValue("gray.300", "gray.800")}>
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
          textColor={"gray.400"}
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
              bg: "gray.600",
            }}
            onClick={() => {
              setSelectedCollection(JSON.stringify(collection));
            }}
          >
            <Heading
              id={`collection-header-${collection._id}`}
              as="h4"
              size={"md"}
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

export default Collections;
