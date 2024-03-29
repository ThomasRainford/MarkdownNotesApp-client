import { ComponentMeta, ComponentStory } from "@storybook/react";
import { NotesList } from "../../../../generated/graphql";
import {
  testCollections,
  testNotesLists,
} from "../../../../test-utils/testData";
import { LocalStorageKeys } from "../../../../utils/types/types";
import Notes from "./Notes";
import { mockNotesProps } from "./Notes.mocks";

export default {
  title: "my-notes/my-notes-content/notes/Notes",
  component: Notes,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Notes>;

localStorage.setItem(
  LocalStorageKeys.SELECTED_COLLECTION,
  JSON.stringify(testCollections[0])
);
localStorage.setItem(
  LocalStorageKeys.SELECTED_LIST,
  JSON.stringify(testCollections[0].lists[0])
);

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Notes> = () => (
  <Notes
    notes={testNotesLists.collection1[0].notes}
    isMe={true}
    notesList={testNotesLists.collection1[0] as NotesList}
  />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockNotesProps.base,
};
