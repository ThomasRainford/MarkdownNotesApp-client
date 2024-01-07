import { ComponentMeta, ComponentStory } from "@storybook/react";
import Chatinfo, { Props } from "./ChatInfo";
import { mocChatInfoProps } from "./ChatInfo.mocks";

export default {
  title: "chat/chat-container/chat-info/ChatInfo",
  component: Chatinfo,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Chatinfo>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Chatinfo> = (args) => (
  <Chatinfo {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mocChatInfoProps.base,
} as Props;
