import { CSSProperties, ReactNode } from "react";
import SplitPane, { Size } from "react-split-pane";

export interface Props {
  panel: ReactNode;
  content: ReactNode;
  minSize?: Size;
  maxSize?: Size;
  defaultSize?: Size;
  style?: CSSProperties;
}

const ResizeablePanel = ({
  panel,
  content,
  minSize,
  maxSize,
  defaultSize,
  style,
}: Props): JSX.Element => {
  return (
    // @ts-ignore
    <SplitPane
      className="split-pane"
      style={style}
      minSize={minSize}
      maxSize={maxSize}
      defaultSize={defaultSize}
    >
      {panel}
      {content}
    </SplitPane>
  );
};

export default ResizeablePanel;
