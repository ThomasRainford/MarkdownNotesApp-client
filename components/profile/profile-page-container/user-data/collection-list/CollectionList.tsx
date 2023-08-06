import { HamburgerIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  StackDivider,
  Tag,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Collection } from "../../../../../generated/graphql";
import { useAllLocalStorageValues } from "../../../../../utils/hooks/useAllLocalStorageValues";

export interface Props {
  collections: Collection[];
}

const CollectionList = ({ collections }: Props): JSX.Element => {
  const router = useRouter();
  const {
    selectedCollection: { setSelectedCollection },
    selectedNotesList: { setSelectedList },
    selectedNote: { setSelectedNote },
  } = useAllLocalStorageValues();

  return (
    <VStack
      divider={<StackDivider borderColor="gray.600" />}
      spacing={4}
      align="stretch"
    >
      {collections.map((collection) => {
        const username = collection.owner.username;
        return (
          <Flex key={collection.id} direction="column">
            <Flex w="100%" justifyContent={"space-between"} mb="1.5em">
              <Flex>
                <Breadcrumb color={"blue.300"} fontSize="lg">
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href={`/profile/${username}`}
                      color={"blue.300"}
                    >
                      {username}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink
                      color={"blue.300"}
                      onClick={() => {
                        setSelectedCollection(
                          JSON.stringify({ id: collection.id })
                        );
                        setSelectedList("");
                        setSelectedNote("");
                        router.push(`/notes/${username}`);
                      }}
                    >
                      {collection.title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
              </Flex>
              <Flex>
                <Tag colorScheme={"teal"}>{collection.visibility}</Tag>
              </Flex>
            </Flex>
            <Flex>
              <Flex mr="2em">
                <Box mr="0.25em">
                  <HamburgerIcon color={"gray.400"} boxSize={"5"} mb="7px" />
                </Box>
                <Box>
                  <Heading size={"sm"} color="gray.400">
                    {collection.lists.length}{" "}
                    {collection.lists.length > 1 ? "Lists" : "List"}
                  </Heading>
                </Box>
              </Flex>
              <Flex mr="0.5em">
                <Box mr="0.25em">
                  <TriangleUpIcon color={"blue.400"} boxSize={"5"} mb="7px" />
                </Box>
                <Box>
                  <Heading size={"sm"} color="gray.400">
                    {collection.upvotes}
                  </Heading>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        );
      })}
    </VStack>
  );
};

export default CollectionList;
