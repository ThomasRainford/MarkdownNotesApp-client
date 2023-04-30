import { ArrowForwardIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Tag,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { FormEvent, useState } from "react";
import { AnyVariables, UseMutationState } from "urql";
import * as Yup from "yup";
import {
  Collection,
  NotesList,
  UpdateNotesListMutation,
  useCreateNotesListMutation,
  useDeleteNotesListMutation,
  useNotesListsQuery,
  useUpdateNotesListMutation,
} from "../../../../generated/graphql";
import { handleCreateNotesListErrors } from "../../../../utils/error-handlers/noteslist-errors";
import { useAllLocalStorageValues } from "../../../../utils/hooks/useAllLocalStorageValues";
import { useUpdateItem } from "../../../../utils/hooks/useUpdateItem";
import ConfirmModal from "../../../helper/CorfirmModal";
import AddOrCancelAddItem from "../../add-or-cancel-add-item/AddOrCancelAddItem";
import NewItemInput from "../../new-item-input/NewItemInput";

const ListDeleteButton = ({
  collection,
  list,
}: {
  collection: Collection;
  list: NotesList;
}) => {
  const {
    list: { setSelectedList },
  } = useAllLocalStorageValues();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [notesListsResult] = useNotesListsQuery({
    variables: { collectionId: collection?.id || "" },
  });
  const [, deleteNotesList] = useDeleteNotesListMutation();

  return (
    <>
      <IconButton
        colorScheme="red"
        variant={"outline"}
        size={"md"}
        aria-label={`delete-list`}
        icon={<DeleteIcon boxSize={4} />}
        onClick={onOpen}
      />
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        headerText={"Delete List?"}
        bodyContent={
          <Text>
            Are you sure you want to delete <Text as="b">{list.title}</Text>
          </Text>
        }
        closeText={"Cancel"}
        confirmText={"Delete"}
        toastText={{
          success: `Successfully deleted ${list.title}.`,
          error: `Failed to delete ${list.title}.`,
        }}
        onConfirm={async () => {
          const result = await deleteNotesList({
            listLocation: {
              collectionId: collection.id,
              listId: list.id,
            },
          });
          if (result.data?.deleteNotesList) {
            if (
              notesListsResult.data?.notesLists &&
              notesListsResult.data?.notesLists?.length > 1
            ) {
              setSelectedList(
                JSON.stringify(notesListsResult.data?.notesLists[0])
              );
            } else {
              setSelectedList("");
            }
            return true;
          } else {
            return false;
          }
        }}
      />
    </>
  );
};

interface FormValues {
  title: string;
}

const NotesListsUpdate = ({ notesList }: { notesList: NotesList }) => {
  const [, updateNotesList] = useUpdateNotesListMutation();
  const toast = useToast();
  const [updateItem] = useUpdateItem();
  const {
    collection: { collection },
  } = useAllLocalStorageValues();

  const formik = useFormik<FormValues>({
    initialValues: {
      title: notesList.title,
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const response = (await updateItem(
        "list",
        {
          listLocation: {
            collectionId: collection?.id || "",
            listId: notesList.id,
          },
          notesListInput: {
            title: values.title,
          },
        },
        updateNotesList
      )) as UseMutationState<UpdateNotesListMutation, AnyVariables>;
      if (
        response.data?.updateNotesList.notesList &&
        !toast.isActive("updateNotesList")
      ) {
        toast({
          id: "updateCollection",
          title: "Successfully Updated List",
          status: "success",
          position: "top",
          duration: 2000,
        });
      }
      if (
        response.data?.updateNotesList.error &&
        !toast.isActive("updateNotesList")
      ) {
        toast({
          id: "updateNotesList",
          title: "Failed to Update List",
          status: "error",
          position: "top",
          duration: 2000,
        });
      }
    },
  });

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          aria-label={"collections-edit"}
          mr={"0.75em"}
          mb="1px"
          variant={"outline"}
          size={"xs"}
          icon={<EditIcon boxSize={3} />}
          onClick={() => {}}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Edit Collection</PopoverHeader>
        <PopoverBody>
          <Stack
            as="form"
            onSubmit={(e) =>
              formik.handleSubmit(e as unknown as FormEvent<HTMLFormElement>)
            }
          >
            <FormControl id="title">
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
              {formik.errors.title && formik.touched.title ? (
                <Text fontSize="sm" fontStyle={"italic"} color={"red.300"}>
                  {formik.errors.title}
                </Text>
              ) : null}
            </FormControl>
            <Box display={"flex"} justifyContent="space-between" mt="1em">
              <Box display={"flex"}>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Submit
                </Button>
              </Box>
              <Box display={"flex"}>
                <ListDeleteButton
                  collection={collection as Collection}
                  list={notesList}
                />
              </Box>
            </Box>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const Lists = (): JSX.Element => {
  const [isAddingNewList, setIsAddingNewList] = useState(false);
  const { colorMode } = useColorMode();
  const toast = useToast();
  const {
    collection: { collection },
    list: { list, setSelectedList },
  } = useAllLocalStorageValues();
  const [notesListsResult] = useNotesListsQuery({
    variables: { collectionId: collection?.id || "" },
  });

  const [, createNotesList] = useCreateNotesListMutation();

  const lists = notesListsResult.data?.notesLists;

  return (
    <Box>
      <Box>
        {!lists ? null : (
          <>
            {lists.map((_list) => {
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
                  borderColor={_list.id === list?.id ? "gray.200" : "gray.800"}
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
                        {_list.id === list?.id && (
                          <NotesListsUpdate notesList={list} />
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
          confirmAdd={async (title: string) => {
            const variables = {
              collectionId: collection?.id || "",
              title,
            };
            const result = await createNotesList(variables);
            const hasError = handleCreateNotesListErrors(
              variables,
              result,
              toast
            );
            if (!hasError) setIsAddingNewList(false);
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
