import { HamburgerIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Tag,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  Collection,
  useSavePublicCollectionMutation,
} from "../../../../../generated/graphql";
import { useAllLocalStorageValues } from "../../../../../utils/hooks/useAllLocalStorageValues";

export interface Props {
  userCollectionsData: Collection[];
  isMe: boolean;
}

const Collections = ({ userCollectionsData, isMe }: Props): JSX.Element => {
  const [result, savePublicCollection] = useSavePublicCollectionMutation();
  const router = useRouter();
  const {
    selectedCollection: { setSelectedCollection },
    selectedNotesList: { setSelectedList },
    selectedNote: { setSelectedNote },
  } = useAllLocalStorageValues();
  const toast = useToast();

  return (
    <Box w="100%">
      <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} w="100%">
        {userCollectionsData.map((collection) => {
          return (
            <Flex
              key={collection.id}
              borderStyle="solid"
              borderWidth={"1px"}
              borderColor="gray.600"
              borderRadius={"5px"}
              p="0.75em"
              mr="0.5em"
              mb="0.85em"
              _hover={
                isMe
                  ? {
                      borderColor: "gray.300",
                    }
                  : {}
              }
              onClick={() => {
                if (!isMe) return;
                setSelectedCollection(JSON.stringify({ id: collection.id }));
                setSelectedList("");
                setSelectedNote("");
                router.push("/my-notes");
              }}
            >
              <Flex flexWrap={"wrap"} w="100%">
                <Flex w="100%" justifyContent={"space-between"} mb="1.5em">
                  <Flex>
                    <Heading size={"sm"} color="gray.300">
                      {collection.title}
                    </Heading>
                  </Flex>
                  <Flex>
                    <Tag colorScheme={"teal"}>{collection.visibility}</Tag>
                  </Flex>
                </Flex>
                <Flex w="100%" justifyContent={"space-between"}>
                  <Flex>
                    <Box mr="0.25em">
                      <HamburgerIcon
                        color={"gray.400"}
                        boxSize={"5"}
                        mb="7px"
                      />
                    </Box>
                    <Box>
                      <Heading size={"sm"} color="gray.400">
                        {collection.lists.length}{" "}
                        {collection.lists.length > 1 ? "Lists" : "List"}
                      </Heading>
                    </Box>
                  </Flex>
                  {!isMe && collection.visibility === "public" && (
                    <Flex>
                      <Tooltip label="Save this collection to your collections">
                        <Button
                          colorScheme={"blue"}
                          size={"xs"}
                          isLoading={result.fetching}
                          onClick={async () => {
                            const test = await savePublicCollection({
                              targetUserId: collection.owner.id,
                              collectionId: collection.id,
                            });
                            if (test.data?.savePublicCollection.collection) {
                              toast({
                                id: "save-public-collection-success",
                                title: `Successfuly saved ${collection.title}`,
                                status: "success",
                                position: "top",
                                duration: 2000,
                              });
                            } else {
                              toast({
                                id: "save-public-collection-error",
                                title: `Failed to save ${collection.title}`,
                                status: "error",
                                position: "top",
                                duration: 2000,
                              });
                            }
                          }}
                        >
                          Save
                        </Button>
                      </Tooltip>
                    </Flex>
                  )}
                  <Flex mr="0.5em">
                    <Box mr="0.25em">
                      <TriangleUpIcon
                        color={"blue.400"}
                        boxSize={"5"}
                        mb="7px"
                      />
                    </Box>
                    <Box>
                      <Heading size={"sm"} color="gray.400">
                        {collection.upvotes}
                      </Heading>
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default Collections;
