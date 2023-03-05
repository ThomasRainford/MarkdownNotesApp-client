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
  Select,
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
  UpdateCollectionMutation,
  useCollectionsQuery,
  useCreateCollectionMutation,
  useDeleteCollectionMutation,
  useUpdateCollectionMutation,
} from "../../../../generated/graphql";
import { handleCreateCollectionErrors } from "../../../../utils/error-handlers/collection-errors";
import { useAllLocalStorageValues } from "../../../../utils/hooks/useAllLocalStorageValues";
import { useUpdateItem } from "../../../../utils/hooks/useUpdateItem";
import ConfirmModal from "../../../helper/CorfirmModal";
import AddOrCancelAddItem from "../../add-or-cancel-add-item/AddOrCancelAddItem";
import NewItemInput from "../../new-item-input/NewItemInput";

const CollectionDeleteButton = ({ collection }: { collection: Collection }) => {
  const {
    collection: { setSelectedCollection },
  } = useAllLocalStorageValues();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, deleteCollection] = useDeleteCollectionMutation();

  return (
    <>
      <IconButton
        colorScheme="red"
        variant={"outline"}
        size={"md"}
        aria-label={`delete-collection`}
        icon={<DeleteIcon boxSize={4} />}
        onClick={onOpen}
      />
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        headerText={"Delete Collection?"}
        bodyContent={
          <Text>
            Are you sure you want to delete{" "}
            <Text as="b">{collection.title}</Text>
          </Text>
        }
        closeText={"Cancel"}
        confirmText={"Delete"}
        onConfirm={() => {
          deleteCollection({ id: collection.id });
          setSelectedCollection("");
        }}
      />
    </>
  );
};

interface FormValues {
  title: string;
  visibility: string;
}

const CollectionsUpdate = ({ collection }: { collection: Collection }) => {
  const [, updateCollection] = useUpdateCollectionMutation();
  const toast = useToast();
  const [updateItem] = useUpdateItem();

  const formik = useFormik<FormValues>({
    initialValues: {
      title: collection.title,
      visibility: collection.visibility,
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Required"),
      visibility: Yup.string()
        .oneOf(["public", "private"])
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const response = (await updateItem(
        "collection",
        {
          id: collection.id,
          collectionInput: {
            ...values,
          },
        },
        updateCollection
      )) as UseMutationState<UpdateCollectionMutation, AnyVariables>;
      if (
        response.data?.updateCollection.collection &&
        !toast.isActive("updateCollection")
      ) {
        toast({
          id: "updateCollection",
          title: "Successfully Updated Collection",
          status: "success",
          position: "top",
          duration: 2000,
        });
      }
      if (
        response.data?.updateCollection.error &&
        !toast.isActive("updateCollection")
      ) {
        toast({
          id: "updateCollection",
          title: "Failed to Update Collection",
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
            <FormControl id="visibility">
              <FormLabel>Visibility</FormLabel>
              <Select
                placeholder="Select option"
                value={formik.values.visibility}
                onChange={formik.handleChange}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </Select>
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
                <CollectionDeleteButton collection={collection} />
              </Box>
            </Box>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const Collections = (): JSX.Element => {
  const [collectionsResult] = useCollectionsQuery();
  const [, createCollection] = useCreateCollectionMutation();
  const [isAddingNewCollection, setIsAddingNewCollection] = useState(false);
  const { colorMode } = useColorMode();
  const toast = useToast();
  const {
    collection: { collection, setSelectedCollection },
    list: { setSelectedList },
  } = useAllLocalStorageValues();

  const collections = collectionsResult.data?.collections;

  return (
    <Box>
      <Box>
        {collections?.map((_collection) => {
          const lists = _collection.lists;
          return (
            <Box
              key={_collection.id}
              display={"flex"}
              pl={"1.5em"}
              pr={"1em"}
              pt={"1em"}
              pb={"1em"}
              _hover={{
                bg: colorMode === "light" ? "gray.200" : "gray.600",
              }}
              border={"1px"}
              borderColor={
                _collection.id === collection?.id ? "gray.200" : "gray.800"
              }
              onClick={() => {
                setSelectedCollection(JSON.stringify(_collection));
                setSelectedList("");
              }}
            >
              <Box display={"flex"} justifyContent="space-between" w={"100%"}>
                <Heading
                  id={`collection-heading-${_collection.id}`}
                  as="h4"
                  size={"md"}
                  color={colorMode === "light" ? "gray.700" : "gray.300"}
                >
                  {_collection.title}
                </Heading>
                <Box display={"flex"}>
                  <Box mr="0.5em">
                    {_collection.id === collection?.id && (
                      <CollectionsUpdate collection={collection} />
                    )}
                    <Tag mt="1px">{lists.length}</Tag>
                  </Box>
                  <Box display={"flex"}>
                    <ArrowForwardIcon
                      boxSize={6}
                      color={colorMode === "light" ? "gray.700" : "gray.500"}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
      {/* Display new collection input when adding new collection */}
      {isAddingNewCollection && (
        <NewItemInput
          type="collection"
          confirmAdd={async (title: string) => {
            const variables = {
              title,
              visibility: "private",
            };
            const result = await createCollection(variables);
            const hasError = handleCreateCollectionErrors(
              variables,
              result,
              toast
            );
            if (!hasError) setIsAddingNewCollection(false);
          }}
        />
      )}
      {/* Display add collection button when not adding new collection */}
      {!isAddingNewCollection ? (
        <AddOrCancelAddItem
          type={"collection"}
          tooltipLabel={"Add Collection"}
          onClick={() => {
            setIsAddingNewCollection(true);
          }}
          iconType={"add"}
        />
      ) : (
        <AddOrCancelAddItem
          type={"collection"}
          tooltipLabel={"Cancel"}
          onClick={() => {
            setIsAddingNewCollection(false);
          }}
          iconType={"cancel"}
        />
      )}
    </Box>
  );
};

export default Collections;
