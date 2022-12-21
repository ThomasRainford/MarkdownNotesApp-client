import { Box } from "@chakra-ui/react";
import ResizeablePanel from "../resizeable-panel/ResizablePanel";
import Collections from "./collections/Collections";
import Lists from "./lists/Lists";

const Panel = () => {
  return <Collections />;
};

const Content = () => {
  return (
    <Box h={"100%"} backgroundColor={"gray.700"}>
      <ResizeablePanel
        panel={<Lists />}
        content={
          <Box h={"100%"} backgroundColor={"gray.600"}>
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
