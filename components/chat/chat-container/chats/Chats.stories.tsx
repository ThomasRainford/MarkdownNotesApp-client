import { ComponentMeta, ComponentStory } from "@storybook/react";
import Chats, { Props } from "./Chats";
import { mockBaseTemplateProps } from "./Chats.mocks";

export default {
  title: "chat/chat-container/chats/Chats",
  component: Chats,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Chats>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Chats> = (args) => <Chats {...args} />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockBaseTemplateProps.base,
} as Props;
