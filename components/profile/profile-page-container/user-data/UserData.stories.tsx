import { ComponentMeta, ComponentStory } from "@storybook/react";
import UserData, { Props } from "./UserData";
import { mockUserDataProps } from "./UserData.mocks";

export default {
  title: "profile/profile-page-container/user-data",
  component: UserData,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof UserData>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UserData> = (args) => (
  <UserData {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockUserDataProps.base,
} as Props;
