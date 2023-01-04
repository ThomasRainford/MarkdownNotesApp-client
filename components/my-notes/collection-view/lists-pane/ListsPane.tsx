import { CheckCircleIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  useColorMode,
} from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { SelectedCollectionContext } from "../../../../contexts/SelectedCollectionContext";
import { SelectedListContext } from "../../../../contexts/SelectedListContext";
import { getLocalStorageValue } from "../../../../utils/getLocalStorageValue";
import { useLocalStorageValue } from "../../../../utils/hooks/useLocalStorageValue";
import {
  LocalStorageContextType,
  LocalStorageKeys,
} from "../../../../utils/types/types";
import Lists from "./lists/Lists";

const ListPaneHeader = ({ collection, selectedList }: any) => {
  const { colorMode } = useColorMode();

  const list = selectedList === "" ? "" : getLocalStorageValue(selectedList);
  console.log("list", list, selectedList);
  console.log("collection", collection);

  return (
    <>
      {selectedList === "" ? (
        <>
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
        </>
      ) : (
        <>
          <Box mr={"2em"}>
            <Heading
              id="list-collection-heading"
              as="h3"
              size={"md"}
              textColor={colorMode === "light" ? "gray.600" : "gray.300"}
            >
              {list.title}
            </Heading>
          </Box>
        </>
      )}
    </>
  );
};

const ListsPane = (): JSX.Element => {
  const [selectedCollection] = useLocalStorageValue(
    SelectedCollectionContext,
    LocalStorageKeys.SELECTED_COLLECTION
  ) as LocalStorageContextType;
  const [selectedList] = useLocalStorageValue(
    SelectedListContext,
    LocalStorageKeys.SELECTED_LIST
  ) as LocalStorageContextType;
  const collection =
    typeof selectedCollection === "string" && selectedCollection !== ""
      ? JSON.parse(selectedCollection)
      : selectedCollection;

  const [content, setContent] = useState<ReactNode | null>(
    selectedList === "" ? <Lists /> : <div>Notes here</div>
  );

  useEffect(() => {
    if (selectedList === "") {
      setContent(<Lists />);
    } else {
      setContent(<div>Notes here</div>);
    }
  }, [selectedList]);

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
              <ListPaneHeader
                collection={collection}
                selectedList={selectedList}
              />
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
      {content}
    </Box>
  );
};

export default ListsPane;
