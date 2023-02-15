import { AddIcon, CheckCircleIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { SelectedCollectionContext } from "../../../../contexts/SelectedCollectionContext";
import { SelectedListContext } from "../../../../contexts/SelectedListContext";
import {
  Collection,
  NotesList,
  useUpdateCollectionMutation,
  useUpdateNotesListMutation,
} from "../../../../generated/graphql";
import { getLocalStorageValue } from "../../../../utils/getLocalStorageValue";
import { useAllLocalStorageValues } from "../../../../utils/hooks/useAllLocalStorageValues";
import { useLocalStorageValue } from "../../../../utils/hooks/useLocalStorageValue";
import { useUpdateItem } from "../../../../utils/hooks/useUpdateItem";
import {
  LocalStorageContextType,
  LocalStorageKeys,
} from "../../../../utils/types/types";
import Lists from "../lists/Lists";
import Notes from "../notes/Notes";

const ListPaneHeaderTitle = ({
  selectedItem,
  title,
  type,
}: {
  selectedItem: Collection | NotesList;
  title: string;
  type: "collection" | "list";
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(title);
  const { colorMode } = useColorMode();

  useEffect(() => {
    setEditingValue(title);
  }, [title]);

  const {
    collection: { collection },
    list: { list },
  } = useAllLocalStorageValues();

  const [, updateCollection] = useUpdateCollectionMutation();
  const [, updateNotesList] = useUpdateNotesListMutation();
  const [updateItem] = useUpdateItem();

  const update = () => {
    if (type === "collection") {
      return updateItem(
        type,
        {
          id: selectedItem.id,
          collectionInput: {
            title: editingValue,
          },
        },
        updateCollection
      );
    } else {
      return updateItem(
        type,
        {
          listLocation: {
            collectionId: collection.id,
            listId: list.id,
          },
          notesListInput: {
            title: editingValue,
          },
        },
        updateNotesList
      );
    }
  };

  return (
    <Box display={"flex"} mr={"2em"}>
      {!isEditing ? (
        <Tooltip
          hasArrow
          placement="top"
          label={"Double click to edit"}
          aria-label={`edit-${type}-tooltip`}
        >
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
        </Tooltip>
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
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                await update();
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
            onClick={async () => {
              await update();
              setIsEditing(false);
            }}
          />
        </Box>
      )}
    </Box>
  );
};

const ListPaneHeader = ({
  collection,
  selectedList,
}: {
  collection: Collection;
  selectedList: string;
}) => {
  const list: NotesList | string =
    selectedList === ""
      ? ""
      : (getLocalStorageValue(selectedList) as NotesList);

  return (
    <>
      {selectedList === "" ? (
        <Box display={"flex"} justifyContent={"space-between"} w="100%">
          <ListPaneHeaderTitle
            selectedItem={collection}
            title={collection.title}
            type="collection"
          />
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
              <ListPaneHeaderTitle
                selectedItem={list as NotesList}
                title={(list as NotesList).title}
                type="list"
              />
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
  const collection = getLocalStorageValue(selectedCollection) as Collection;

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
