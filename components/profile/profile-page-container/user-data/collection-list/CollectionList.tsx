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
import { Collection } from "../../../../../generated/graphql";

export interface Props {
  collections: Collection[];
}

const CollectionList = ({ collections }: Props): JSX.Element => {
  return (
    <VStack
      divider={<StackDivider borderColor="gray.600" />}
      spacing={4}
      align="stretch"
    >
      {collections.map((collection) => {
        return (
          <Flex key={collection.id} direction="column">
            <Flex w="100%" justifyContent={"space-between"} mb="1.5em">
              <Flex>
                <Breadcrumb color={"blue.300"} fontSize="lg">
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href={`/profile/${collection.owner.username}`}
                      color={"blue.300"}
                    >
                      {collection.owner.username}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink color={"blue.300"}>
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
