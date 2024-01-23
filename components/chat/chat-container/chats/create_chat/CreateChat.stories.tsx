import { ComponentMeta, ComponentStory } from "@storybook/react";
import CreateChat, { Props } from "./CreateChat";
import { mockCreateChatProps } from "./CreateChat.mocks";

export default {
  title: "templates/base/BaseTemplate",
  component: CreateChat,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CreateChat>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CreateChat> = () => <CreateChat />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockCreateChatProps.base,
} as Props;
