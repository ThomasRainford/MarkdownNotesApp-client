import { ArrowRightIcon } from "@chakra-ui/icons";
import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Allotment } from "allotment";
import { MyNotesSmallDesktopViewPaneVisibleContext } from "../../../contexts/MyNotesSmallDesktopViewPaneVisibleContext";
import { useLocalStorageValue } from "../../../utils/hooks/useLocalStorageValue";
import {
  LocalStorageContextType,
  LocalStorageKeys,
} from "../../../utils/types/types";
import LeftPaneContent from "./left-pane-content/LeftPaneContent";
import NoteContent from "./note-content/NoteContent";
import RightPaneContent from "./right-pane-content/RightPaneContent";

const MyNotesContent = (): JSX.Element => {
  return (
    <Box className="my-notes-content" h={"calc(100% - 64px)"}>
      <DesktopView />
      <SmallDesktopView />
      <MobileView />
    </Box>
  );
};

const DesktopView = () => {
  return (
    <Box
      h={"100%"}
      w={"100%"}
      display={{ base: "none", sm: "none", md: "flex" }}
    >
      <Allotment>
        <Allotment.Pane preferredSize={275} minSize={225} maxSize={350}>
          <LeftPaneContent />
        </Allotment.Pane>
        <Allotment>
          <Allotment.Pane preferredSize={275} minSize={225} maxSize={300}>
            <RightPaneContent />
          </Allotment.Pane>
          <Allotment.Pane>
            <Box
              h={"100%"}
              w={"100%"}
              overflow={"auto"}
              className="note-content-container"
              backgroundColor={useColorModeValue("gray.200", "gray.600")}
            >
              <NoteContent />
            </Box>
          </Allotment.Pane>
        </Allotment>
      </Allotment>
    </Box>
  );
};

const SmallDesktopView = () => {
  const [paneVisible, setPaneVisible] = useLocalStorageValue(
    MyNotesSmallDesktopViewPaneVisibleContext,
    LocalStorageKeys.MY_NOTES_VISIBLE_PANE
  ) as LocalStorageContextType;
  const { colorMode } = useColorMode();

  return (
    <Box
      h={"100%"}
      w={"100%"}
      display={{ base: "none", sm: "flex", md: "none" }}
    >
      <Allotment>
        {paneVisible === "true" ? (
          <Allotment.Pane minSize={250} maxSize={400}>
            <Allotment vertical>
              <Allotment.Pane>
                <LeftPaneContent />
              </Allotment.Pane>
              <Allotment.Pane>
                <RightPaneContent />
              </Allotment.Pane>
            </Allotment>
          </Allotment.Pane>
        ) : (
          <Allotment.Pane minSize={50} maxSize={50}>
            <Box
              display={"flex"}
              justifyContent="center"
              mt="0.5em"
              h={"100%"}
              w={"100%"}
              backgroundColor={colorMode === "light" ? "gray.400" : "gray.800"}
            >
              <ArrowRightIcon
                onClick={() => {
                  setPaneVisible("true");
                }}
              />
            </Box>
          </Allotment.Pane>
        )}
        <Allotment>
          <Allotment.Pane>
            <Box
              h={"100%"}
              w={"100%"}
              overflow={"auto"}
              className="note-content-container"
              backgroundColor={useColorModeValue("gray.200", "gray.600")}
            >
              <NoteContent />
            </Box>
          </Allotment.Pane>
        </Allotment>
      </Allotment>
    </Box>
  );
};

const MobileView = () => {
  return (
    <Box
      h={"100%"}
      w={"100%"}
      display={{ base: "flex", sm: "none", md: "none" }}
    >
      mobileview
    </Box>
  );
};

export default MyNotesContent;
