import { Box, useColorModeValue } from "@chakra-ui/react";
import ResizeablePanel from "../resizable-panel/ResizablePanel";
import LeftPaneContent from "./left-pane-content/LeftPaneContent";
import NoteContent from "./note-content/NoteContent";
import RightPaneContent from "./right-pane-content/RightPaneContent";

const LeftPane = () => {
  return <LeftPaneContent />;
};

const RightPane = () => {
  return (
    <Box h={"100%"} backgroundColor={useColorModeValue("gray.300", "gray.700")}>
      <ResizeablePanel
        panel={<RightPaneContent />}
        content={
          <Box
            h={"100%"}
            className="note-content-container"
            backgroundColor={useColorModeValue("gray.200", "gray.600")}
          >
            <NoteContent />
          </Box>
        }
        minSize={300}
        maxSize={440}
        defaultSize={340}
        style={{
          display: "flex",
          flex: "1 1 0%",
          height: "100%",
          position: "absolute",
          outline: "none",
          overflow: "hidden",
          userSelect: "text",
          flexDirection: "row",
          left: "0px",
          right: "0px",
        }}
      />
    </Box>
  );
};

const MyNotesContent = (): JSX.Element => {
  return (
    <Box
      className="my-notes-content"
      h={"calc(100% - 64px)"}
      overflowY={"hidden"}
    >
      <ResizeablePanel
        panel={<LeftPane />}
        content={<RightPane />}
        minSize={300}
        maxSize={450}
        defaultSize={350}
        style={{
          display: "flex",
          flex: "1 1 0%",
          height: "calc(100% - 64px)",
          position: "absolute",
          outline: "none",
          overflow: "hidden",
          overflowY: "hidden",
          userSelect: "text",
          flexDirection: "row",
          left: "0px",
          right: "0px",
        }}
      />
    </Box>
  );
};

export default MyNotesContent;
