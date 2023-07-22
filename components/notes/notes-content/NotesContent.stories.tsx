import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SelectedCollectionProvider } from "../../../contexts/SelectedCollectionContext";
import { SelectedListProvider } from "../../../contexts/SelectedListContext";
import NotesContent from "./NotesContent";
import { mockNotesContentProps } from "./NotesContent.mocks";

export default {
  title: "notes/notes-content/NotesContent",
  component: NotesContent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof NotesContent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NotesContent> = () => (
  <SelectedCollectionProvider>
    <SelectedListProvider>
      <NotesContent />
    </SelectedListProvider>
  </SelectedCollectionProvider>
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockNotesContentProps.base,
};
