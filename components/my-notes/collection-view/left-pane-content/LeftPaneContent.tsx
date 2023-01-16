import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  IconButton,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
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
      <Box
        display={"flex"}
        justifyContent="space-between"
        px={"1em"}
        py={"1em"}
      >
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
            >
              Collections
            </Heading>
          ) : (
            <Heading
              id="list-heading"
              as="h3"
              size={"lg"}
              fontWeight="normal"
              textColor={colorMode === "light" ? "gray.700" : "gray.400"}
            >
              {collection.title}
            </Heading>
          )}
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <Tooltip
            hasArrow
            placement="top"
            label={selectedList === "" ? "Add Collection" : "Add List"}
            aria-label="add-cl"
          >
            <IconButton
              colorScheme="teal"
              variant={"ghost"}
              aria-label="Search database"
              icon={<AddIcon boxSize={5} />}
              onClick={() => {
                if (selectedList === "") {
                  // Add new collection
                } else {
                  // Add new list
                }
              }}
            />
          </Tooltip>
        </Box>
      </Box>
      {content}
    </Box>
  );
};

export default LeftPaneContent;
