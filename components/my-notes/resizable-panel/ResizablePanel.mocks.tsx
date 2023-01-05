import { Props } from "./ResizablePanel";

const base: Props = {
  panel: (
    <div style={{ height: "100%", backgroundColor: "#1A202C" }}>Panel</div>
  ),
  content: (
    <div style={{ height: "100%", backgroundColor: "#2D3748" }}>Content</div>
  ),
  minSize: 150,
  maxSize: 400,
  defaultSize: 250,
};

export const mockResizeablePanelProps = {
  base,
};
