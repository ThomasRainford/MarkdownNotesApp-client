import { ComponentMeta, ComponentStory } from "@storybook/react";
import Messages, { Props } from "./Messages";
import { mockMessageProps } from "./Messages.mocks";

export default {
  title: "templates/base/BaseTemplate",
  component: Messages,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Messages>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Messages> = (args) => (
  <Messages {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockMessageProps.base,
} as Props;
