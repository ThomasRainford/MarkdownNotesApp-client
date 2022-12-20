import { ReactNode } from "react";
import SplitPane from "react-split-pane";
import "./ResizablePanel.css";

export interface Props {
  panel: ReactNode;
  content: ReactNode;
}

const ResizeablePanel = ({ panel, content }: Props): JSX.Element => {
  return (
    // @ts-ignore
    <SplitPane
      style={{ height: "100vh" }}
      minSize={150}
      maxSize={400}
      defaultSize={250}
    >
      {panel}
      {content}
    </SplitPane>
  );
};

export default ResizeablePanel;
