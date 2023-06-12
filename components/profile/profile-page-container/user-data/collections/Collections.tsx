import { HamburgerIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, SimpleGrid, Tag } from "@chakra-ui/react";
import { Collection } from "../../../../../generated/graphql";

export interface Props {
  userCollectionsData: Collection[];
}

const Collections = ({ userCollectionsData }: Props): JSX.Element => {
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
              _hover={{
                borderColor: "gray.500",
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
