import { ComponentMeta, ComponentStory } from "@storybook/react";
import Create, { Props } from "./Create";
import { mockCreateProps } from "./Create.mocks";

export default {
  title: "my-notes/create/Create",
  component: Create,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Create>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Create> = (args) => <Create {...args} />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockCreateProps.base,
} as Props;
