import { ComponentMeta, ComponentStory } from "@storybook/react";
import CollectionList, { Props } from "./CollectionList";
import { mockBaseTemplateProps } from "./CollectionList.mocks";

export default {
  title: "profile/profile-page-container/user-data/collection-list",
  component: CollectionList,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CollectionList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CollectionList> = (args) => (
  <CollectionList {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockBaseTemplateProps.base,
} as Props;
