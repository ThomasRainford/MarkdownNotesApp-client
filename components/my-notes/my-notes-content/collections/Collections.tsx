import { ArrowForwardIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  IconButton,
  Tag,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  Collection,
  useCollectionsQuery,
  useCreateCollectionMutation,
  useDeleteCollectionMutation,
} from "../../../../generated/graphql";
import { handleCreateCollectionErrors } from "../../../../utils/error-handlers/collection-errors";
import { useAllLocalStorageValues } from "../../../../utils/hooks/useAllLocalStorageValues";
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
        mr={"0.75em"}
        mb="1px"
        colorScheme="red"
        variant={"outline"}
        size={"xs"}
        aria-label={`delete-collection`}
        icon={<DeleteIcon boxSize={3} />}
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
                      <CollectionDeleteButton collection={collection} />
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
