import { ReactNode } from "react";
import SplitPane, { Size } from "react-split-pane";

export interface Props {
  panel: ReactNode;
  content: ReactNode;
  mineSize?: Size;
  maxSize?: Size;
  defaultSize?: Size;
}

const ResizeablePanel = ({
  panel,
  content,
  mineSize,
  maxSize,
  defaultSize,
}: Props): JSX.Element => {
  return (
    // @ts-ignore
    <SplitPane
      style={{ height: "100vh" }}
      minSize={mineSize}
      maxSize={maxSize}
      defaultSize={defaultSize}
    >
      {panel}
      {content}
    </SplitPane>
  );
};

export default ResizeablePanel;
