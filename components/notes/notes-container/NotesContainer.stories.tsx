import { ComponentMeta, ComponentStory } from "@storybook/react";
import NotesContainer, { Props } from "./NotesContainer";
import { mockBaseTemplateProps } from "./NotesContainer.mocks";

export default {
  title: "notes/notes-container/NotesContainer",
  component: NotesContainer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof NotesContainer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NotesContainer> = (args) => (
  <NotesContainer {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockBaseTemplateProps.base,
} as Props;
