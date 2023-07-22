import { ComponentMeta, ComponentStory } from "@storybook/react";
import Collections, { Props } from "./Collections";
import { mockCollectionsProps } from "./Collections.mocks";

export default {
  title: "profile/profile-page-container/user-data/collections",
  component: Collections,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Collections>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Collections> = (args) => (
  <Collections {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockCollectionsProps.base,
} as Props;
