import { ComponentMeta, ComponentStory } from "@storybook/react";
import Lists from "./Lists";
import { mockListsProps } from "./Lists.mocks";

export default {
  title: "my-notes/collection-view/Lists",
  component: Lists,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Lists>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Lists> = () => <Lists />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockListsProps.base,
};
