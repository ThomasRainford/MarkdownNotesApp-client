import { Box, useColorModeValue } from "@chakra-ui/react";
import ResizeablePanel from "../resizeable-panel/ResizablePanel";
import LeftPaneContent from "./left-pane-content/LeftPaneContent";
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
            backgroundColor={useColorModeValue("gray.200", "gray.600")}
          >
            <div>Note Editor</div>
          </Box>
        }
        minSize={150}
        maxSize={400}
        defaultSize={270}
      />
    </Box>
  );
};

const CollectionView = (): JSX.Element => {
  return (
    <ResizeablePanel
      panel={<LeftPane />}
      content={<RightPane />}
      minSize={260}
      maxSize={400}
      defaultSize={300}
    />
  );
};

export default CollectionView;
