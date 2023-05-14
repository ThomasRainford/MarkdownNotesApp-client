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
  NotesList,
  UpdateNotesListMutation,
  useCreateNotesListMutation,
  useDeleteNotesListMutation,
  useNotesListsQuery,
  useUpdateNotesListMutation,
} from "../../../../generated/graphql";
import { handleCreateNotesListErrors } from "../../../../utils/error-handlers/noteslist-errors";
import { getSelectedNotesList } from "../../../../utils/getSelectedValue";
import { useAllLocalStorageValues } from "../../../../utils/hooks/useAllLocalStorageValues";
import { useUpdateItem } from "../../../../utils/hooks/useUpdateItem";
import { setNotesListValue } from "../../../../utils/setLocalStorageValue";
import ConfirmModal from "../../../helper/CorfirmModal";
import AddOrCancelAddItem from "../../add-or-cancel-add-item/AddOrCancelAddItem";
import NewItemInput from "../../new-item-input/NewItemInput";

const ListDeleteButton = ({
  collectionId,
  list,
}: {
  collectionId: string;
  list: NotesList;
}) => {
  const {
    selectedNotesList: { setSelectedList },
  } = useAllLocalStorageValues();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [notesListsResult] = useNotesListsQuery({
    variables: { collectionId },
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
              collectionId,
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
    selectedCollection: { selectedCollection },
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
            collectionId: selectedCollection?.id || "",
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
                  collectionId={selectedCollection?.id || ""}
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

export interface Props {
  notesLists: NotesList[];
}

const Lists = ({ notesLists }: Props): JSX.Element => {
  const [isAddingNewList, setIsAddingNewList] = useState(false);
  const { colorMode } = useColorMode();
  const toast = useToast();
  const {
    selectedCollection: { selectedCollection },
    selectedNotesList: { selectedList, setSelectedList },
  } = useAllLocalStorageValues();

  const notesList = getSelectedNotesList(selectedList, notesLists);

  const [, createNotesList] = useCreateNotesListMutation();

  return (
    <Box>
      <Box>
        {!notesLists ? null : (
          <>
            {notesLists.map((_notesList) => {
              const notes = _notesList.notes;
              return (
                <Box
                  key={_notesList.id}
                  display={"flex"}
                  pl={"1.5em"}
                  pr={"1em"}
                  pt={"1em"}
                  pb={"1em"}
                  _hover={{
                    bg: colorMode === "light" ? "gray.200" : "gray.600",
                  }}
                  border={_notesList.id === notesList?.id ? "1px" : ""}
                  borderColor={
                    _notesList.id === notesList?.id ? "gray.200" : "gray.800"
                  }
                  onClick={() => {
                    const selectedValue = setNotesListValue(
                      _notesList as NotesList
                    );
                    setSelectedList(JSON.stringify(selectedValue));
                  }}
                >
                  <Box display={"flex"} justifyContent="space-between" w="100%">
                    <Heading
                      id={`list-heading-${_notesList.id}`}
                      as="h4"
                      size={"md"}
                      pr={"1em"}
                      color={colorMode === "light" ? "gray.600" : "gray.300"}
                    >
                      {_notesList.title}
                    </Heading>
                    <Box display={"flex"}>
                      <Box mr="0.5em">
                        {_notesList.id === notesList?.id && (
                          <NotesListsUpdate notesList={_notesList} />
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
              collectionId: selectedCollection?.id || "",
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
