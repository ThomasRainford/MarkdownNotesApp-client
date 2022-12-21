import { CheckCircleIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Tag,
} from "@chakra-ui/react";
import { useLocalStorageValue } from "../../../../utils/hooks/useLocalStorageValue";
import { LocalStorageContextType } from "../../../../utils/types/types";

const Lists = (): JSX.Element => {
  const [selectedCollection] = useLocalStorageValue<string>(
    "selectedCollection"
  ) as LocalStorageContextType<string>;
  const collection = JSON.parse(selectedCollection);
  const lists = collection?.lists;

  return (
    <Box h={"100%"}>
      <Box
        h={"122px"}
        display={"flex"}
        justifyContent="space-between"
        px={"1em"}
        py={"1em"}
      >
        {!collection ? (
          <p>Select a collection</p>
        ) : (
          <Box>
            <Box display={"flex"}>
              <Box mr={"2em"}>
                <Heading as="h3" size={"md"} textColor={"gray.300"}>
                  {collection.title}
                </Heading>
              </Box>
              <Box display={"flex"} justifyContent="space-between">
                <CheckCircleIcon
                  color={"blue.400"}
                  boxSize={4}
                  mt={"4px"}
                  mr="0.25em"
                />
                <Heading as={"h6"} size="sm" mt={"2px"}>
                  {collection.upvotes}
                </Heading>
              </Box>
            </Box>
            <Box mt={"1.75em"}>
              <InputGroup>
                <InputLeftAddon children={<TriangleUpIcon />} />
                <Input type="text" placeholder="Filter Lists..." />
              </InputGroup>
            </Box>
          </Box>
        )}
      </Box>
      {!lists ? null : (
        <>
          {lists.map((list: any) => {
            const notes = list.notes;
            return (
              <Box
                key={list._id}
                display={"flex"}
                pl={"1.5em"}
                pr={"1em"}
                pt={"1em"}
                pb={"1em"}
                _hover={{
                  bg: "gray.600",
                }}
              >
                <Heading as="h4" size={"md"} pr={"1em"}>
                  {list.title}
                </Heading>
                <Tag>{notes.length}</Tag>
              </Box>
            );
          })}
        </>
      )}
    </Box>
  );
};

export default Lists;
