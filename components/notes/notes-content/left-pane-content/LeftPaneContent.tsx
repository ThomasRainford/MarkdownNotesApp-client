import { ArrowBackIcon, ArrowLeftIcon } from "@chakra-ui/icons";
import { Box, Heading, IconButton, useColorMode } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { MyNotesSmallDesktopViewPaneVisibleContext } from "../../../../contexts/MyNotesSmallDesktopViewPaneVisibleContext";
import { Collection } from "../../../../generated/graphql";
import { getSelectedCollection } from "../../../../utils/getSelectedValue";
import { useAllLocalStorageValues } from "../../../../utils/hooks/useAllLocalStorageValues";
import { useLocalStorageValue } from "../../../../utils/hooks/useLocalStorageValue";
import { LocalStorageContextType } from "../../../../utils/types/types";
import Collections from "../collections/Collections";
import Lists from "../lists/Lists";

export interface Props {
  isMe: boolean;
  userCollectionsData: Collection[];
}

const LeftPaneContent = ({ isMe, userCollectionsData }: Props): JSX.Element => {
  const {
    selectedCollection: { selectedCollection },
    selectedNotesList: { selectedList, setSelectedList },
  } = useAllLocalStorageValues();
  const collection = getSelectedCollection(
    selectedCollection,
    userCollectionsData as Collection[]
  );
  const [content, setContent] = useState<ReactNode | null>(null);
  const { colorMode } = useColorMode();
  const [, setPaneVisible] = useLocalStorageValue(
    MyNotesSmallDesktopViewPaneVisibleContext
  ) as LocalStorageContextType;

  useEffect(() => {
    if (!selectedList?.id) {
      setContent(
        <Collections isMe={isMe} userCollectionsData={userCollectionsData} />
      );
    } else {
      setContent(<Lists isMe={isMe} notesLists={collection?.lists || []} />);
    }
  }, [selectedList?.id, collection?.lists, userCollectionsData, isMe]);

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
