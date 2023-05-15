import { ArrowBackIcon, ArrowLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  IconButton,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { MyNotesSmallDesktopViewPaneVisibleContext } from "../../../../contexts/MyNotesSmallDesktopViewPaneVisibleContext";
import { Collection, useCollectionsQuery } from "../../../../generated/graphql";
import { getSelectedCollection } from "../../../../utils/getSelectedValue";
import { useAllLocalStorageValues } from "../../../../utils/hooks/useAllLocalStorageValues";
import { useLocalStorageValue } from "../../../../utils/hooks/useLocalStorageValue";
import {
  LocalStorageContextType,
  LocalStorageKeys,
} from "../../../../utils/types/types";
import Collections from "../collections/Collections";
import Lists from "../lists/Lists";

const LeftPaneContentCollectionsError = () => {
  return (
    <Box>
      <Box display={"flex"} pl={"1.5em"} pr={"1em"} pt={"1em"} pb={"1em"}>
        Something went wrong fetching your collections!
      </Box>
    </Box>
  );
};

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
  const [content, setContent] = useState<ReactNode | null>(null);
  const { colorMode } = useColorMode();
  const [, setPaneVisible] = useLocalStorageValue(
    MyNotesSmallDesktopViewPaneVisibleContext,
    LocalStorageKeys.MY_NOTES_VISIBLE_PANE
  ) as LocalStorageContextType;

  useEffect(() => {
    if (collectionsResult.error) {
      setContent(<LeftPaneContentCollectionsError />);
      return;
    } else if (collectionsResult.fetching) {
      setContent(<Spinner />);
      return;
    }
    if (!selectedList?.id) {
      setContent(<Collections />);
    } else {
      setContent(<Lists notesLists={collection?.lists || []} />);
    }
  }, [
    selectedList?.id,
    collection?.lists,
    collectionsResult.error,
    collectionsResult.fetching,
  ]);

  return (
    <Box
      h={"100%"}
      backgroundColor={colorMode === "light" ? "gray.400" : "gray.800"}
    >
      <Box display={"flex"} h={"50px"}>
        <Box
          display={{ base: "none", sm: "flex", md: "none" }}
          justifyContent={"end"}
          w={"100%"}
          pr={"0.5em"}
          pt={"0.45em"}
        >
          <ArrowLeftIcon
            onClick={() => {
              setPaneVisible("false");
            }}
          />
        </Box>
      </Box>
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
        <Box display={"flex"} justifyContent={"center"}>
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
              as="h4"
              size={"md"}
              fontWeight="normal"
              fontSize={"30px"}
              textColor={colorMode === "light" ? "gray.700" : "gray.400"}
              pl={"0.5em"}
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
