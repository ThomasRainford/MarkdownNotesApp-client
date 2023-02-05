import { ArrowForwardIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { SelectedCollectionContext } from "../../../../contexts/SelectedCollectionContext";
import { SelectedListContext } from "../../../../contexts/SelectedListContext";
import { useNotesListsQuery } from "../../../../generated/graphql";
import { getLocalStorageValue } from "../../../../utils/getLocalStorageValue";
import { useLocalStorageValue } from "../../../../utils/hooks/useLocalStorageValue";
import {
  LocalStorageContextType,
  LocalStorageKeys,
} from "../../../../utils/types/types";
import AddOrCancelAddItem from "../../add-or-cancel-add-item/AddOrCancelAddItem";
import NewItemInput from "../../new-item-input/NewItemInput";

const ListDeleteButton = ({ list }: { list: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        mr={"0.75em"}
        mb="1px"
        colorScheme="red"
        variant={"outline"}
        size={"xs"}
        aria-label={`delete-list`}
        icon={<DeleteIcon boxSize={3} />}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete List?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete <Text as="b">{list.title}</Text>
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="solid" colorScheme={"red"} onClick={() => {}}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

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

  const [notesListsResult] = useNotesListsQuery({
    variables: { collectionId: collection?.id || "" },
  });
  const lists = notesListsResult.data?.notesLists;

  return (
    <Box>
      <Box>
        {!lists ? null : (
          <>
            {lists.map((_list: any) => {
              const notes = _list.notes;
              return (
                <Box
                  key={_list.id}
                  display={"flex"}
                  pl={"1.5em"}
                  pr={"1em"}
                  pt={"1em"}
                  pb={"1em"}
                  _hover={{
                    bg: colorMode === "light" ? "gray.200" : "gray.600",
                  }}
                  border={_list.id === list?.id ? "1px" : ""}
                  borderColor={
                    _list._id === list?._id ? "gray.200" : "gray.800"
                  }
                  onClick={() => setSelectedList(JSON.stringify(_list))}
                >
                  <Box display={"flex"} justifyContent="space-between" w="100%">
                    <Heading
                      id={`list-heading-${_list.id}`}
                      as="h4"
                      size={"md"}
                      pr={"1em"}
                      color={colorMode === "light" ? "gray.600" : "gray.300"}
                    >
                      {_list.title}
                    </Heading>
                    <Box display={"flex"}>
                      <Box mr="0.5em">
                        {_list.id === list?._id && (
                          <ListDeleteButton list={list} />
                        )}
                        <Tag mt="1px">{notes.length}</Tag>
                      </Box>
                      <Box>
                        <ArrowForwardIcon
                          boxSize={6}
                          color={
                            colorMode === "light" ? "gray.700" : "gray.500"
                          }
                        />
                      </Box>
                    </Box>
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
          tooltipLabel={"Cancel"}
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
