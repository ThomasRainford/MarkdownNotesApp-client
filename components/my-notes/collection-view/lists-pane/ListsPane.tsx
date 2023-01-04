import {
  ArrowForwardIcon,
  CheckCircleIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Tag,
  useColorMode,
} from "@chakra-ui/react";
import { SelectedCollectionContext } from "../../../../contexts/SelectedCollectionContext";
import { SelectedListContext } from "../../../../contexts/SelectedListContext";
import { useLocalStorageValue } from "../../../../utils/hooks/useLocalStorageValue";
import {
  LocalStorageContextType,
  LocalStorageKeys,
} from "../../../../utils/types/types";

const ListsPane = (): JSX.Element => {
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

  const { colorMode } = useColorMode();

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
          <Box w={"100%"}>
            <Box display={"flex"}>
              <Box mr={"2em"}>
                <Heading
                  id="list-collection-heading"
                  as="h3"
                  size={"md"}
                  textColor={colorMode === "light" ? "gray.600" : "gray.300"}
                >
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
                {/* eslint-disable-next-line */}
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

export default ListsPane;
