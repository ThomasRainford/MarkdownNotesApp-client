import { ComponentMeta, ComponentStory } from "@storybook/react";
import NoteEditor, { Props } from "./NoteEditor";
import { mockNoteEditorProps } from "./NoteEditor.mocks";

export default {
  title: "my-notes/my-notes-content/note-content/note-editor/NoteEditor",
  component: NoteEditor,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof NoteEditor>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NoteEditor> = (args) => (
  <NoteEditor {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockNoteEditorProps.base,
} as Props;
