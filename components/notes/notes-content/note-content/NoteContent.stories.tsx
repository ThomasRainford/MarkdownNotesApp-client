import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Collection } from "../../../../generated/graphql";
import { _testCollections } from "../../../../test-utils/testData";
import NoteContent from "./NoteContent";
import { mockNoteContentProps } from "./NoteContent.mocks";

export default {
  title: "my-notes/my-notes-content/note-content/NoteContent",
  component: NoteContent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof NoteContent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NoteContent> = () => (
  <NoteContent
    isMe={true}
    userCollectionsData={_testCollections as Collection[]}
  />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockNoteContentProps.base,
};
