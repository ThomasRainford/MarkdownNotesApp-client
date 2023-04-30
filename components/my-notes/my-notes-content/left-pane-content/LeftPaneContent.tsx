import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Heading, IconButton, useColorMode } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { Collection, useCollectionsQuery } from "../../../../generated/graphql";
import { getSelectedCollection } from "../../../../utils/getSelectedValue";
import { useAllLocalStorageValues } from "../../../../utils/hooks/useAllLocalStorageValues";
import Collections from "../collections/Collections";
import Lists from "../lists/Lists";

const LeftPaneContent = (): JSX.Element => {
  const [collectionsResult] = useCollectionsQuery();
  const {
    selectedCollection: { selectedCollection },
    selectedNotesList: { selectedList, setSelectedList },
  } = useAllLocalStorageValues();
  const collection = getSelectedCollection(
    selectedCollection,
    collectionsResult.data?.collections as Collection[]
  );

  const [content, setContent] = useState<ReactNode | null>(
    !selectedList ? (
      <Collections />
    ) : (
      <Lists notesLists={collection?.lists || []} />
    )
  );

  const { colorMode } = useColorMode();

  useEffect(() => {
    if (!selectedList?.id) {
      setContent(<Collections />);
    } else {
      setContent(<Lists notesLists={collection?.lists || []} />);
    }
  }, [selectedList?.id, collection?.lists]);

  return (
    <Box
      h={"100%"}
      backgroundColor={colorMode === "light" ? "gray.400" : "gray.800"}
    >
      <Box h={"50px"} />
      <Box display={"flex"} px={"1em"} py={"1em"}>
        {selectedList ? (
          <Box visibility={selectedList ? "visible" : "hidden"}>
            <IconButton
              aria-label={"left-pane-back-button"}
              variant="outline"
              colorScheme="blue"
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedList("")}
            />
          </Box>
        ) : null}
        <Box>
          {!selectedList ? (
            <Heading
              id="collection-heading"
              as="h3"
              size={"lg"}
              fontWeight="normal"
              textColor={colorMode === "light" ? "gray.700" : "gray.400"}
              h={"40px"}
            >
              Collections
            </Heading>
          ) : (
            <Heading
              id="list-heading"
              as="h5"
              size={"lg"}
              fontWeight="normal"
              textColor={colorMode === "light" ? "gray.700" : "gray.400"}
              pl={"1em"}
            >
              {collection?.title}
            </Heading>
          )}
        </Box>
      </Box>
      {content}
    </Box>
  );
};

export default LeftPaneContent;
