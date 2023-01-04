import { AddIcon } from "@chakra-ui/icons";
import { Box, Heading, IconButton, useColorModeValue } from "@chakra-ui/react";
import Collections from "./Collections/Collections";

const CollectionsPane = (): JSX.Element => (
  <Box h={"100%"} backgroundColor={useColorModeValue("gray.400", "gray.800")}>
    <Box h={"50px"}></Box>
    <Box display={"flex"} justifyContent="space-between" px={"1em"} py={"1em"}>
      <Heading
        id="collection-heading"
        as="h3"
        size={"lg"}
        fontWeight="normal"
        textColor={useColorModeValue("gray.700", "gray.400")}
      >
        Collections
      </Heading>
      <Box display={"flex"} alignItems={"center"}>
        <IconButton
          colorScheme="teal"
          variant={"ghost"}
          aria-label="Search database"
          icon={<AddIcon boxSize={5} />}
        />
      </Box>
    </Box>
    <Collections />
  </Box>
);

export default CollectionsPane;
