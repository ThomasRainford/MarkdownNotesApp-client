import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SelectedCollectionProvider } from "../../../contexts/SelectedCollectionContext";
import { SelectedListProvider } from "../../../contexts/SelectedListContext";
import CollectionView from "./CollectionView";
import { mockCollectionViewProps } from "./CollectionView.mocks";

export default {
  title: "my-notes/collection-view/CollectionView",
  component: CollectionView,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CollectionView>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CollectionView> = () => (
  <SelectedCollectionProvider>
    <SelectedListProvider>
      <CollectionView />
    </SelectedListProvider>
  </SelectedCollectionProvider>
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockCollectionViewProps.base,
};
