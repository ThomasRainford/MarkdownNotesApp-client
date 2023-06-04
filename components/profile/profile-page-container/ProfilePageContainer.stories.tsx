import { ComponentMeta, ComponentStory } from "@storybook/react";
import ProfilePageContainer, { Props } from "./ProfilePageContainer";
import { mockBaseTemplateProps } from "./ProfilePageContainer.mocks";

export default {
  title: "templates/base/BaseTemplate",
  component: ProfilePageContainer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ProfilePageContainer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProfilePageContainer> = (args) => (
  <ProfilePageContainer {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockBaseTemplateProps.base,
} as Props;
