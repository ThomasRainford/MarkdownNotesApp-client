export type LocalStorageContextType = [string, (value: string) => void];

export enum LocalStorageKeys {
  SELECTED_COLLECTION = "selectedCollection",
  SELECTED_LIST = "selectedList",
  SELECTED_NOTE = "selectedNote",
}

export type SelectedNote = {
  note: any; // This will be the generated graphql type.
  list: any; // This will be the generated graphql type.
  collection: any; // This will be the generated graphql type.
};
