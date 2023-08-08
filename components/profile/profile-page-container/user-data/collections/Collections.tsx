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
import { useState } from "react";
import {
  Collection,
  User,
  useSavePublicCollectionMutation,
  useVoteMutation,
} from "../../../../../generated/graphql";
import { useAllLocalStorageValues } from "../../../../../utils/hooks/useAllLocalStorageValues";

export interface Props {
  userCollectionsData: Collection[];
  userData: User;
  meData: User;
}

const Collections = ({
  userCollectionsData,
  userData,
  meData,
}: Props): JSX.Element => {
  const [savePublicCollectionResult, savePublicCollection] =
    useSavePublicCollectionMutation();
  const [voteResult, vote] = useVoteMutation();
  const router = useRouter();
  const {
    selectedCollection: { setSelectedCollection },
    selectedNotesList: { setSelectedList },
    selectedNote: { setSelectedNote },
  } = useAllLocalStorageValues();
  const toast = useToast();
  const [votingCollection, setVotingCollection] = useState<string>();
  const [savingPublicCollection, setSavingPublicCollection] =
    useState<string>();

  const isMe = meData.id === userData.id;

  return (
    <Box w="100%">
      <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} w="100%">
        {userCollectionsData.map((collection) => {
          const hasVoted = meData.upvoted.includes(collection.id);
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
              _hover={{
                borderColor: "gray.300",
              }}
            >
              <Flex flexWrap={"wrap"} w="100%">
                <Flex w="100%" justifyContent={"space-between"} mb="1.5em">
                  <Flex>
                    <Heading
                      size={"sm"}
                      color="gray.300"
                      _hover={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        if (!userData.username) {
                          toast({
                            id: "profile-collection-click",
                            title: "Could not access this collection.",
                            status: "error",
                            position: "top",
                            duration: 2000,
                          });
                          return;
                        }
                        setSelectedCollection(
                          JSON.stringify({ id: collection.id })
                        );
                        setSelectedList("");
                        setSelectedNote("");
                        router.push(`/notes/${userData.username}`);
                      }}
                    >
                      {collection.title}
                    </Heading>
                  </Flex>
                  <Flex>
                    <Tag
                      variant={
                        collection.visibility === "public" ? "solid" : "outline"
                      }
                      colorScheme={"teal"}
                    >
                      {collection.visibility}
                    </Tag>
                  </Flex>
                </Flex>
                <Flex w="100%" justifyContent={"space-between"}>
                  <Flex>
                    <Flex align={"center"} mr="0.25em">
                      <HamburgerIcon color={"gray.400"} boxSize={"5"} />
                    </Flex>
                    <Flex align={"center"}>
                      <Heading size={"sm"} color="gray.400">
                        {collection.lists.length}{" "}
                        {collection.lists.length > 1 ? "Lists" : "List"}
                      </Heading>
                    </Flex>
                  </Flex>
                  {!isMe && collection.visibility === "public" && (
                    <Flex align={"center"}>
                      <Tooltip label="Save this collection to your collections">
                        <Button
                          colorScheme={"blue"}
                          size={"xs"}
                          isLoading={
                            savePublicCollectionResult.fetching &&
                            savingPublicCollection === collection.id
                          }
                          onClick={async () => {
                            setSavingPublicCollection(collection.id);
                            const result = await savePublicCollection({
                              targetUserId: collection.owner.id,
                              collectionId: collection.id,
                            });
                            if (result.data?.savePublicCollection.collection) {
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
                  <Flex align={"center"} mr="0.5em">
                    <Button
                      size={"sm"}
                      isLoading={
                        voteResult.fetching &&
                        votingCollection === collection.id
                      }
                      leftIcon={
                        <TriangleUpIcon
                          color={hasVoted ? "yellow" : "blue.400"}
                          boxSize={"5"}
                        />
                      }
                      onClick={async () => {
                        setVotingCollection(collection.id);
                        const result = await vote({
                          id: collection.id,
                        });
                        const error = result.data?.vote.error;
                        if (error) {
                          toast({
                            id: "vote-colelction-error-message",
                            title: `Failed to vote for ${collection.title} - ${error.message}`,
                            status: "error",
                            position: "top",
                            duration: 2000,
                          });
                        } else if (result.error) {
                          toast({
                            id: "vote-colelction-error",
                            title: `Failed to vote for ${collection.title}`,
                            status: "error",
                            position: "top",
                            duration: 2000,
                          });
                        }
                      }}
                    >
                      {collection.upvotes}
                    </Button>
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
