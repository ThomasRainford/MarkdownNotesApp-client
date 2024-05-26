import { AddIcon, CheckCircleIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Skeleton,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { filter, includes } from "lodash";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  Collection,
  Note,
  NotesList,
  User,
  useUpdateCollectionMutation,
  useUpdateNotesListMutation,
  useUserNotesListsQuery,
} from "../../../../generated/graphql";
import { getSelectedCollection } from "../../../../utils/getSelectedValue";
import { useAllLocalStorageValues } from "../../../../utils/hooks/useAllLocalStorageValues";
import { useUpdateItem } from "../../../../utils/hooks/useUpdateItem";
import { SelectedNotesList } from "../../../../utils/types/types";
import Lists from "../lists/Lists";
import Notes from "../notes/Notes";

const Error = () => {
  return (
    <Box>
      <Box display={"flex"} pl={"1.5em"} pr={"1em"} pt={"1em"} pb={"1em"}>
        Something went wrong fetching your lists!
      </Box>
    </Box>
  );
};

const Loading = () => (
  <Box>
    <Box mx={"0.5em"} mb={"1em"}>
      <Skeleton height="60px" mb="0.5em" />
    </Box>
  </Box>
);

export const FilterInput = (props: {
  selectedList: SelectedNotesList | null;
  notesLists: NotesList[];
  notes: Note[];
  displayed: string;
  setCurrentFilter: Dispatch<
    SetStateAction<
      | {
          displayed: string;
          items: string[];
        }
      | undefined
    >
  >;
}) => {
  const { selectedList, notesLists, notes, displayed, setCurrentFilter } =
    props;
  const [filterText, setFilterText] = useState<string>("");

  useEffect(() => {
    if (displayed) setFilterText("");
  }, [displayed]);

  return (
    <Input
      type="text"
      value={filterText}
      placeholder={!selectedList ? "Filter Lists..." : "Filter Notes..."}
      onChange={(event) => {
        const value = event.target.value;
        setFilterText(value);
        const displayed = !selectedList ? "list" : "note";
        const items = (
          displayed === "list"
            ? notesLists.map((nl) => nl.title)
            : notes?.map((n) => n.title)
        )?.map((i) => i.toLowerCase());
        const filteredItems = filter(items, (item) => includes(item, value));
        setCurrentFilter({ displayed, items: filteredItems });
      }}
    />
  );
};

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
            as="h4"
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

export interface Props {
  isMe: boolean;
  userData: User;
  userCollectionsData: Collection[];
}

const RightPaneContent = ({
  isMe,
  userData,
  userCollectionsData,
}: Props): JSX.Element => {
  const {
    selectedCollection: { selectedCollection },
    selectedNotesList: { selectedList },
  } = useAllLocalStorageValues();
  const collection = getSelectedCollection(
    selectedCollection,
    userCollectionsData
  );
  const [userNotesListsResult] = useUserNotesListsQuery({
    variables: {
      collectionId: collection?.id || "",
      userId: userData.id,
    },
  });
  const [displayed, setDisplayed] = useState<string>("");
  const [currentFilter, setCurrentFilter] = useState<{
    displayed: string;
    items: string[];
  }>();
  const notesLists = userNotesListsResult.data?.userNotesLists as NotesList[];
  const notesList = notesLists?.find((nl) => nl.id === selectedList?.id);
  const notes = notesList?.notes as Note[];
  const [content, setContent] = useState<ReactNode | null>(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (userNotesListsResult.error) {
      setContent(<Error />);
      return;
    } else if (userNotesListsResult.fetching) {
      setContent(<Loading />);
      return;
    } else if (selectedCollection?.id && !selectedList?.id) {
      setDisplayed("notesList");
      setContent(
        <Lists
          isMe={isMe}
          notesLists={
            currentFilter?.displayed === "list"
              ? notesLists.filter(
                  (nl) =>
                    currentFilter?.displayed === "list" &&
                    currentFilter.items.includes(nl.title.toLowerCase())
                )
              : notesLists || []
          }
        />
      );
    } else if (selectedList?.id && notesList) {
      setDisplayed("note");
      setContent(
        <Notes
          isMe={isMe}
          notes={
            currentFilter?.displayed === "note"
              ? notes.filter((n) =>
                  currentFilter.items.includes(n.title.toLowerCase())
                )
              : notes || []
          }
          notesList={notesList}
        />
      );
      return;
    } else {
      setContent(null);
    }
  }, [
    selectedCollection?.id,
    selectedList?.id,
    notesLists,
    notes,
    currentFilter?.displayed,
    currentFilter?.items,
    userNotesListsResult.error,
    userNotesListsResult.fetching,
    notesList,
    isMe,
  ]);

  return (
    <Box
      h={"100%"}
      backgroundColor={colorMode === "light" ? "gray.300" : "gray.700"}
    >
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
                <FilterInput
                  selectedList={selectedList}
                  notesLists={notesLists}
                  notes={notes}
                  displayed={displayed}
                  setCurrentFilter={setCurrentFilter}
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
