import { ComponentMeta, ComponentStory } from "@storybook/react";
import UserList, { Props } from "./UserList";
import { mockUserListProps } from "./UserList.mocks";

export default {
  title: "profile/profile-page-container/user-data/collections",
  component: UserList,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof UserList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UserList> = (args) => (
  <UserList {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockUserListProps.base,
} as Props;
