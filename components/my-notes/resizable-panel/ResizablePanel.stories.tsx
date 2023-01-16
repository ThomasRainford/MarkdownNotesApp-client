import { ComponentMeta, ComponentStory } from "@storybook/react";
import ResizeablePanel, { Props } from "./ResizablePanel";
import { mockResizeablePanelProps } from "./ResizablePanel.mocks";

export default {
  title: "my-notes/resizable-panel/ResizablePanel",
  component: ResizeablePanel,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ResizeablePanel>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ResizeablePanel> = (args) => (
  <ResizeablePanel {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockResizeablePanelProps.base,
} as Props;
