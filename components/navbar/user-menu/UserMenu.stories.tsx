import { ComponentMeta, ComponentStory } from "@storybook/react";
import BaseTemplate, { Props } from "./UserMenu";
import { mockUserMenuProps } from "./UserMenu.mocks";

export default {
  title: "home/user-menu",
  component: BaseTemplate,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof BaseTemplate>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BaseTemplate> = (args) => (
  <BaseTemplate {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockUserMenuProps.base,
} as Props;
