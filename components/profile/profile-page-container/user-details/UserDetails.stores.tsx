import { ComponentMeta, ComponentStory } from "@storybook/react";
import UserDetails from "./UserDetails";
import { mockBaseTemplateProps } from "./UserDetails.mocks";

export default {
  title: "profile/profile-page-container/user-details",
  component: UserDetails,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof UserDetails>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UserDetails> = (args) => (
  <UserDetails {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockBaseTemplateProps.base,
};
