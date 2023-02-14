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
import {
  useCollectionsQuery,
  useCreateCollectionMutation,
} from "../../../../generated/graphql";
import { useAllLocalStorageValues } from "../../../../utils/hooks/useAllLocalStorageValues";
import AddOrCancelAddItem from "../../add-or-cancel-add-item/AddOrCancelAddItem";
import NewItemInput from "../../new-item-input/NewItemInput";

const CollectionDeleteButton = ({ collection }: { collection: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Collection?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete{" "}
              <Text as="b">{collection.title}</Text>
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

const Collections = (): JSX.Element => {
  const [collectionsResult] = useCollectionsQuery();
  const [, createCollection] = useCreateCollectionMutation();
  const [isAddingNewCollection, setIsAddingNewCollection] = useState(false);
  const { colorMode } = useColorMode();
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
                    {_collection.id === collection?._id && (
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
          confirmAdd={(title: string) => {
            createCollection({
              title,
              visibility: collection.visibility,
            });
            setIsAddingNewCollection(false);
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
