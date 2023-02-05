import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SelectedCollectionProvider } from "../../../contexts/SelectedCollectionContext";
import { SelectedListProvider } from "../../../contexts/SelectedListContext";
import MyNotesContent from "./MyNotesContent";
import { mockMyNotesContentProps } from "./MyNotesContent.mocks";

export default {
  title: "my-notes/my-notes-content/MyNotesContent",
  component: MyNotesContent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof MyNotesContent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MyNotesContent> = () => (
  <SelectedCollectionProvider>
    <SelectedListProvider>
      <MyNotesContent />
    </SelectedListProvider>
  </SelectedCollectionProvider>
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockMyNotesContentProps.base,
};
