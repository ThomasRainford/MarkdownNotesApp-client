import { Box, useColorModeValue } from "@chakra-ui/react";
import ResizeablePanel from "../resizeable-panel/ResizablePanel";
import Collections from "./collections/Collections";
import Lists from "./lists/Lists";

const Panel = () => {
  return <Collections />;
};
// useColorModeValue("gray.300", "gray.900")
const Content = () => {
  return (
    <Box h={"100%"} backgroundColor={useColorModeValue("gray.200", "gray.700")}>
      <ResizeablePanel
        panel={<Lists />}
        content={
          <Box
            h={"100%"}
            backgroundColor={useColorModeValue("gray.100", "gray.600")}
          >
            <div>Note Editor</div>
          </Box>
        }
        mineSize={150}
        maxSize={400}
        defaultSize={270}
      />
    </Box>
  );
};

const CollectionView = (): JSX.Element => {
  return (
    <ResizeablePanel
      panel={<Panel />}
      content={<Content />}
      mineSize={150}
      maxSize={400}
      defaultSize={275}
    />
  );
};

export default CollectionView;
