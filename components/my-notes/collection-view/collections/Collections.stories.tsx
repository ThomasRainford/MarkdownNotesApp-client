import { ComponentMeta, ComponentStory } from "@storybook/react";
import Collections from "./Collections";
import { mockCollectionsProps } from "./Collections.mocks";

export default {
  title: "templates/BaseTemplate",
  component: Collections,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Collections>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Collections> = () => <Collections />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockCollectionsProps.base,
};
