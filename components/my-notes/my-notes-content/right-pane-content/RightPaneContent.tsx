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
import {
  Collection,
  NotesList,
  useCollectionsQuery,
  useNotesListsQuery,
  useUpdateCollectionMutation,
  useUpdateNotesListMutation,
} from "../../../../generated/graphql";
import { getSelectedCollection } from "../../../../utils/getSelectedValue";
import { useAllLocalStorageValues } from "../../../../utils/hooks/useAllLocalStorageValues";
import { useUpdateItem } from "../../../../utils/hooks/useUpdateItem";
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
    selectedCollection: { selectedCollection },
    selectedNotesList: { selectedList },
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
            collectionId: selectedCollection?.id || "",
            listId: selectedList?.id || "",
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
            pt={"3px"}
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
  notesList,
}: {
  collection: Collection;
  notesList: NotesList;
}) => {
  return (
    <Box className="list-pane-header" display={"flex"} w="100%" h="2em">
      {!notesList ? (
        <Box display={"flex"} justifyContent={"space-between"} w="100%">
          <ListPaneHeaderTitle
            selectedItem={collection}
            title={collection?.title}
            type="collection"
          />
          <Box display={"flex"}>
            <Box display={"flex"} alignItems="center">
              <CheckCircleIcon
                color={"blue.400"}
                boxSize={4}
                mt={"2px"}
                mr="0.25em"
              />
              <Heading as={"h6"} size="sm" mt={"2px"}>
                {collection?.upvotes}
              </Heading>
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          <Box display={"flex"} justifyContent="space-between" w="100%">
            <ListPaneHeaderTitle
              selectedItem={notesList}
              title={notesList.title}
              type="list"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const RightPaneContent = (): JSX.Element => {
  const [collectionsResult] = useCollectionsQuery();
  const {
    selectedCollection: { selectedCollection },
    selectedNotesList: { selectedList },
  } = useAllLocalStorageValues();
  const collection = getSelectedCollection(
    selectedCollection,
    collectionsResult.data?.collections as Collection[]
  );
  const [notesListsResult] = useNotesListsQuery({
    variables: {
      collectionId: selectedCollection?.id || "",
    },
  });
  const notesLists = notesListsResult.data?.notesLists as NotesList[];
  const notesList = notesLists?.find((nl) => nl.id === selectedList?.id);
  const notes = notesList?.notes;
  const [content, setContent] = useState<ReactNode | null>(
    <Lists notesLists={notesLists || []} />
  );

  useEffect(() => {
    if (selectedCollection?.id) {
      setContent(<Lists notesLists={notesLists || []} />);
    }
    if (selectedList?.id) {
      setContent(<Notes notes={notes || []} />);
    }
  }, [selectedCollection?.id, selectedList?.id, notesLists, notes]);

  return (
    <Box h={"100%"}>
      <Box
        h={"122px"}
        display={"flex"}
        justifyContent="space-between"
        px={"1em"}
        py={"1em"}
      >
        {!selectedCollection ? (
          <p>Select a collection</p>
        ) : (
          <Box w={"100%"}>
            <ListPaneHeader
              collection={collection as Collection}
              notesList={notesList as NotesList}
            />
            <Box mt={"1.75em"}>
              <InputGroup>
                {/* eslint-disable-next-line */}
                <InputLeftAddon children={<TriangleUpIcon />} />
                <Input
                  type="text"
                  placeholder={
                    !selectedList ? "Filter Lists..." : "Filter Notes..."
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
