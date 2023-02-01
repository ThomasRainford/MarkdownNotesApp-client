import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Heading, Tag, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SelectedCollectionContext } from "../../../../contexts/SelectedCollectionContext";
import { SelectedListContext } from "../../../../contexts/SelectedListContext";
import { testCollections } from "../../../../test-utils/testData";
import { getLocalStorageValue } from "../../../../utils/getLocalStorageValue";
import { useLocalStorageValue } from "../../../../utils/hooks/useLocalStorageValue";
import {
  LocalStorageContextType,
  LocalStorageKeys,
} from "../../../../utils/types/types";
import AddOrCancelAddItem from "../../add-or-cancel-add-item/AddOrCancelAddItem";
import NewItemInput from "../../new-item-input/NewItemInput";

const Lists = (): JSX.Element => {
  const [isAddingNewList, setIsAddingNewList] = useState(false);
  const { colorMode } = useColorMode();
  const [selectedCollection] = useLocalStorageValue(
    SelectedCollectionContext,
    LocalStorageKeys.SELECTED_COLLECTION
  ) as LocalStorageContextType;
  const [selectedList, setSelectedList] = useLocalStorageValue(
    SelectedListContext,
    LocalStorageKeys.SELECTED_LIST
  ) as LocalStorageContextType;
  const collection = getLocalStorageValue(selectedCollection);
  const list = getLocalStorageValue(selectedList);

  // TODO: Should get Lists from API.
  const [lists, setLists] = useState(
    testCollections.find((c) => c._id === collection._id)?.lists
  );
  useEffect(() => {
    setLists(testCollections.find((c) => c._id === collection._id)?.lists);
  }, [JSON.stringify(collection), collection._id]);

  return (
    <Box>
      <Box>
        {!lists ? null : (
          <>
            {lists.map((_list: any) => {
              const notes = _list.notes;
              return (
                <Box
                  key={_list._id}
                  display={"flex"}
                  justifyContent={"space-between"}
                  pl={"1.5em"}
                  pr={"1em"}
                  pt={"1em"}
                  pb={"1em"}
                  _hover={{
                    bg: colorMode === "light" ? "gray.200" : "gray.600",
                  }}
                  border={_list._id === list?._id ? "1px" : ""}
                  borderColor={
                    _list._id === list?._id ? "gray.200" : "gray.800"
                  }
                  onClick={() => setSelectedList(JSON.stringify(_list))}
                >
                  <Box display={"flex"}>
                    <Heading
                      id={`list-heading-${_list._id}`}
                      as="h4"
                      size={"md"}
                      pr={"1em"}
                      color={colorMode === "light" ? "gray.600" : "gray.300"}
                    >
                      {_list.title}
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
      {isAddingNewList && (
        <NewItemInput
          type="list"
          confirmAdd={(title: string) => {
            setIsAddingNewList(false);
            setLists([
              ...(lists || []),
              {
                _id: !lists ? 1 : lists[lists.length - 1]._id + 1,
                title,
                notes: [],
              },
            ]);
          }}
        />
      )}
      {!isAddingNewList ? (
        <AddOrCancelAddItem
          type={"list"}
          tooltipLabel={"Add List"}
          onClick={() => {
            setIsAddingNewList(true);
          }}
          iconType={"add"}
        />
      ) : (
        <AddOrCancelAddItem
          type={"list"}
          tooltipLabel={"Canel"}
          onClick={() => {
            setIsAddingNewList(false);
          }}
          iconType={"cancel"}
        />
      )}
    </Box>
  );
};

export default Lists;
