import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LocalStorageProvider } from "../../../contexts/LocalStorageContext";
import CollectionView from "./CollectionView";
import { mockCollectionViewProps } from "./CollectionView.mocks";

export default {
  title: "my-notes/CollectionView",
  component: CollectionView,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CollectionView>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CollectionView> = () => (
  <LocalStorageProvider storageKey="selectedCollection">
    <CollectionView />
  </LocalStorageProvider>
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockCollectionViewProps.base,
};
