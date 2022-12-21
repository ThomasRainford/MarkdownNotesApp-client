import { AddIcon } from "@chakra-ui/icons";
import { Box, Heading, IconButton, Tag } from "@chakra-ui/react";
import { useState } from "react";
import { useLocalStorageValue } from "../../../../utils/hooks/useLocalStorageValue";
import { LocalStorageContextType } from "../../../../utils/types/types";

const Collections = (): JSX.Element => {
  const [collections] = useState([
    {
      _id: 1,
      title: "Collection 1",
      upvotes: 0,
      lists: [
        {
          title: "List 1",
          notes: [{ _id: 1, title: "Note 1", body: "Body 1" }],
        },
      ],
    },
    {
      _id: 2,
      title: "Collection 2",
      upvotes: 0,
      lists: [
        {
          title: "List 2",
          notes: [{ _id: 2, title: "Note 2", body: "Body 2" }],
        },
      ],
    },
    {
      _id: 3,
      title: "Collection 3",
      upvotes: 0,
      lists: [
        {
          title: "List 3",
          notes: [{ _id: 3, title: "Note 3", body: "Body 3" }],
        },
      ],
    },
  ]);
  const [, setSelectedCollection] = useLocalStorageValue<string>(
    "selectedCollection"
  ) as LocalStorageContextType<string>;

  return (
    <Box h={"100%"}>
      <Box h={"50px"}></Box>
      <Box
        display={"flex"}
        justifyContent="space-between"
        px={"1em"}
        py={"1em"}
      >
        <Heading as="h3" size={"lg"} fontWeight="normal" textColor={"gray.400"}>
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
            onClick={() => setSelectedCollection(JSON.stringify(collection))}
          >
            <Heading as="h4" size={"md"}>
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
