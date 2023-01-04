import { Box, useColorModeValue } from "@chakra-ui/react";
import ResizeablePanel from "../resizeable-panel/ResizablePanel";
import CollectionsPane from "./collections-pane/CollectionsPane";
import ListsPane from "./lists-pane/ListsPane";

// TODO: Refactor Collections component to be 'CollectionPane' and Lists to
// 'ListsPane'. These components will render a Collections and Lists components
// that will only render out the list of collections or lists.

const LeftPane = () => {
  return <CollectionsPane />;
};

const RightPane = () => {
  return (
    <Box h={"100%"} backgroundColor={useColorModeValue("gray.300", "gray.700")}>
      <ResizeablePanel
        panel={<ListsPane />}
        content={
          <Box
            h={"100%"}
            backgroundColor={useColorModeValue("gray.200", "gray.600")}
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
      panel={<LeftPane />}
      content={<RightPane />}
      mineSize={150}
      maxSize={400}
      defaultSize={275}
    />
  );
};

export default CollectionView;
