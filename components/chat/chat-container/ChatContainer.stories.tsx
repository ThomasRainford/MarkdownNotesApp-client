import { ComponentMeta, ComponentStory } from "@storybook/react";
import ChatPageContainer, { Props } from "./ChatContainer";
import { mockChatsProps } from "./ChatContainer.mocks";

export default {
  title: "chat/chat-container/ChatPageContainer",
  component: ChatPageContainer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ChatPageContainer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ChatPageContainer> = (args) => (
  <ChatPageContainer {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockChatsProps.base,
} as Props;
