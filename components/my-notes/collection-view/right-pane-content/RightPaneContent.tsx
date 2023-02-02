import { AddIcon, CheckCircleIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  IconButton,
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
import Lists from "../lists/Lists";
import Notes from "../notes/Notes";

const ListPaneHeaderTitle = ({
  title,
  type,
}: {
  title: string;
  type: "collection" | "list";
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(title);
  const { colorMode } = useColorMode();

  return (
    <Box display={"flex"} mr={"2em"}>
      {!isEditing ? (
        <Heading
          id="right-pane-heading"
          as="h3"
          size={"md"}
          textColor={colorMode === "light" ? "gray.600" : "gray.300"}
          onDoubleClick={() => {
            setIsEditing(!isEditing);
            setEditingValue(title);
          }}
        >
          {editingValue}
        </Heading>
      ) : (
        <Box display={"flex"}>
          <Input
            value={editingValue}
            size="sm"
            onChange={(e) => {
              setEditingValue(e.target.value);
            }}
            onDoubleClick={() => {
              setIsEditing(!isEditing);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsEditing(false);
              }
            }}
          />
          <IconButton
            colorScheme="blue"
            size={"sm"}
            variant={"outline"}
            aria-label={`update-${type}-title`}
            icon={<AddIcon boxSize={3} />}
            onClick={() => {
              setIsEditing(false);
            }}
          />
        </Box>
      )}
    </Box>
  );
};

const ListPaneHeader = ({ collection, selectedList }: any) => {
  const list = selectedList === "" ? "" : getLocalStorageValue(selectedList);

  return (
    <>
      {selectedList === "" ? (
        <Box display={"flex"} justifyContent={"space-between"} w="100%">
          <ListPaneHeaderTitle title={collection.title} type="collection" />
          <Box display={"flex"}>
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
      ) : (
        <>
          <Box display={"flex"} justifyContent="space-between" w="100%">
            <Box display={"flex"} alignItems="center">
              <ListPaneHeaderTitle title={list.title} type="list" />
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

const RightPaneContent = (): JSX.Element => {
  const [selectedCollection] = useLocalStorageValue(
    SelectedCollectionContext,
    LocalStorageKeys.SELECTED_COLLECTION
  ) as LocalStorageContextType;
  const [selectedList] = useLocalStorageValue(
    SelectedListContext,
    LocalStorageKeys.SELECTED_LIST
  ) as LocalStorageContextType;
  const collection = getLocalStorageValue(selectedCollection);

  const [content, setContent] = useState<ReactNode | null>(<Lists />);

  useEffect(() => {
    if (selectedList === "") {
      setContent(<Lists />);
    } else {
      setContent(<Notes />);
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
            <Box display={"flex"} w="100%">
              <ListPaneHeader
                collection={collection}
                selectedList={selectedList}
              />
            </Box>
            <Box mt={"1.75em"}>
              <InputGroup>
                {/* eslint-disable-next-line */}
                <InputLeftAddon children={<TriangleUpIcon />} />
                <Input
                  type="text"
                  placeholder={
                    selectedList === "" ? "Filter Lists..." : "Filter Notes..."
                  }
                />
              </InputGroup>
            </Box>
          </Box>
        )}
      </Box>
      {content}
    </Box>
  );
};

export default RightPaneContent;
