import { ArrowRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Allotment } from "allotment";
import { useRef } from "react";
import { MyNotesSmallDesktopViewPaneVisibleContext } from "../../../contexts/MyNotesSmallDesktopViewPaneVisibleContext";
import { Collection, User } from "../../../generated/graphql";
import { useLocalStorageValue } from "../../../utils/hooks/useLocalStorageValue";
import { LocalStorageContextType } from "../../../utils/types/types";
import LeftPaneContent from "./left-pane-content/LeftPaneContent";
import NoteContent from "./note-content/NoteContent";
import RightPaneContent from "./right-pane-content/RightPaneContent";

const DesktopView = ({
  isMe,
  userData,
  userCollectionsData,
}: {
  isMe: boolean;
  userData: User;
  userCollectionsData: Collection[];
}) => {
  return (
    <Box
      h={"100%"}
      w={"100%"}
      display={{ base: "none", sm: "none", md: "flex" }}
    >
      <Allotment>
        <Allotment.Pane preferredSize={250} minSize={225} maxSize={350}>
          <LeftPaneContent
            isMe={isMe}
            userCollectionsData={userCollectionsData}
          />
        </Allotment.Pane>
        <Allotment>
          <Allotment.Pane preferredSize={225} minSize={225} maxSize={300}>
            <RightPaneContent
              isMe={isMe}
              userData={userData}
              userCollectionsData={userCollectionsData}
            />
          </Allotment.Pane>
          <Allotment.Pane>
            <Box
              h={"100%"}
              w={"100%"}
              overflow={"auto"}
              className="note-content-container"
              backgroundColor={useColorModeValue("gray.200", "gray.600")}
            >
              <NoteContent
                isMe={isMe}
                userCollectionsData={userCollectionsData}
              />
            </Box>
          </Allotment.Pane>
        </Allotment>
      </Allotment>
    </Box>
  );
};

const SmallDesktopView = ({
  isMe,
  userData,
  userCollectionsData,
}: {
  isMe: boolean;
  userData: User;
  userCollectionsData: Collection[];
}) => {
  const [paneVisible, setPaneVisible] = useLocalStorageValue(
    MyNotesSmallDesktopViewPaneVisibleContext
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
                <LeftPaneContent
                  isMe={isMe}
                  userCollectionsData={userCollectionsData}
                />
              </Allotment.Pane>
              <Allotment.Pane>
                <RightPaneContent
                  isMe={isMe}
                  userData={userData}
                  userCollectionsData={userCollectionsData}
                />
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
              <NoteContent
                isMe={isMe}
                userCollectionsData={userCollectionsData}
              />
            </Box>
          </Allotment.Pane>
        </Allotment>
      </Allotment>
    </Box>
  );
};

const MobileView = ({
  isMe,
  userData,
  userCollectionsData,
}: {
  isMe: boolean;
  userData: User;
  userCollectionsData: Collection[];
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <Box
      h={"100%"}
      w={"100%"}
      display={{ base: "flex", sm: "none", md: "none" }}
    >
      <Box
        h={"100%"}
        w={"100%"}
        overflow={"auto"}
        className="note-content-container"
        backgroundColor={useColorModeValue("gray.200", "gray.600")}
      >
        <Box mt={"0.5em"} ml="1em">
          <IconButton
            ref={btnRef as any}
            colorScheme="teal"
            aria-label="Open Note Selector"
            variant={"outline"}
            size={"sm"}
            icon={<ArrowRightIcon />}
            onClick={onOpen}
          />
        </Box>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef as any}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton zIndex={1} />
            <DrawerBody p={0} m={0}>
              <Box p={0} m={0} h={"100%"} w={"100%"}>
                <Allotment>
                  <Allotment.Pane minSize={250} maxSize={400}>
                    <Allotment vertical>
                      <Allotment.Pane>
                        <LeftPaneContent
                          isMe={isMe}
                          userCollectionsData={userCollectionsData}
                        />
                      </Allotment.Pane>
                      <Allotment.Pane>
                        <RightPaneContent
                          isMe={isMe}
                          userData={userData}
                          userCollectionsData={userCollectionsData}
                        />
                      </Allotment.Pane>
                    </Allotment>
                  </Allotment.Pane>
                </Allotment>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <NoteContent isMe={isMe} userCollectionsData={userCollectionsData} />
      </Box>
    </Box>
  );
};

export interface Props {
  isMe: boolean;
  userData: User;
  userCollectionsData: Collection[];
}

const NotesContent = ({
  isMe,
  userData,
  userCollectionsData,
}: Props): JSX.Element => {
  return (
    <Box className="notes-page-content" h={"calc(100% - 64px)"}>
      <DesktopView
        isMe={isMe}
        userData={userData}
        userCollectionsData={userCollectionsData}
      />
      <SmallDesktopView
        isMe={isMe}
        userData={userData}
        userCollectionsData={userCollectionsData}
      />
      <MobileView
        isMe={isMe}
        userData={userData}
        userCollectionsData={userCollectionsData}
      />
    </Box>
  );
};

export default NotesContent;
