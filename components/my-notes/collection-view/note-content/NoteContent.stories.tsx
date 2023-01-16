import { ComponentMeta, ComponentStory } from "@storybook/react";
import NoteContent from "./NoteContent";
import { mockBaseTemplateProps } from "./NoteContent.mocks";

export default {
  title: "templates/base/BaseTemplate",
  component: NoteContent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof NoteContent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NoteContent> = () => <NoteContent />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockBaseTemplateProps.base,
};
