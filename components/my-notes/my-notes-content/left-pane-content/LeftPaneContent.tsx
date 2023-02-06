import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Heading, IconButton, useColorMode } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { SelectedCollectionContext } from "../../../../contexts/SelectedCollectionContext";
import { SelectedListContext } from "../../../../contexts/SelectedListContext";
import { getLocalStorageValue } from "../../../../utils/getLocalStorageValue";
import { useLocalStorageValue } from "../../../../utils/hooks/useLocalStorageValue";
import {
  LocalStorageContextType,
  LocalStorageKeys,
} from "../../../../utils/types/types";
import Collections from "../collections/Collections";
import Lists from "../lists/Lists";

const LeftPaneContent = (): JSX.Element => {
  const [selectedCollection] = useLocalStorageValue(
    SelectedCollectionContext,
    LocalStorageKeys.SELECTED_COLLECTION
  ) as LocalStorageContextType;
  const [selectedList, setSelectedList] = useLocalStorageValue(
    SelectedListContext,
    LocalStorageKeys.SELECTED_LIST
  ) as LocalStorageContextType;

  const collection = getLocalStorageValue(selectedCollection);

  const [content, setContent] = useState<ReactNode | null>(
    selectedList === "" ? <Collections /> : <Lists />
  );

  const { colorMode } = useColorMode();

  useEffect(() => {
    if (selectedList === "") {
      setContent(<Collections />);
    } else {
      setContent(<Lists />);
    }
  }, [selectedList]);

  return (
    <Box
      h={"100%"}
      backgroundColor={colorMode === "light" ? "gray.400" : "gray.800"}
    >
      <Box h={"50px"} />
      <Box display={"flex"} px={"1em"} py={"1em"}>
        {selectedList !== "" ? (
          <Box visibility={selectedList !== "" ? "visible" : "hidden"}>
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
          {selectedList === "" ? (
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
              {collection.title}
            </Heading>
          )}
        </Box>
      </Box>
      {content}
    </Box>
  );
};

export default LeftPaneContent;