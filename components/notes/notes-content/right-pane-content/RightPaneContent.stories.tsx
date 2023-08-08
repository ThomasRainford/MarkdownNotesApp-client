import { ComponentMeta, ComponentStory } from "@storybook/react";
import { User } from "../../../../generated/graphql";
import { testUser } from "../../../../test-utils/testData";
import RightPaneContent from "./RightPaneContent";
import { mockListsProps } from "./RightPaneContent.mocks";

export default {
  title: "my-notes/my-notes-content/RightPaneContent",
  component: RightPaneContent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof RightPaneContent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RightPaneContent> = () => (
  <RightPaneContent
    isMe={true}
    userData={testUser as unknown as User}
    userCollectionsData={[]}
  />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockListsProps.base,
};
