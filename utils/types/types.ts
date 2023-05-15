export type LocalStorageContextType = [string, (_: string) => void];

export enum LocalStorageKeys {
  // eslint-disable-next-line no-unused-vars
  SELECTED_COLLECTION = "selectedCollection",
  // eslint-disable-next-line no-unused-vars
  SELECTED_LIST = "selectedList",
  // eslint-disable-next-line no-unused-vars
  SELECTED_NOTE = "selectedNote",
  // eslint-disable-next-line no-unused-vars
  MY_NOTES_VISIBLE_PANE = "sdv-pane-visible",
}

export type SelectedCollection = {
  id: string;
};

export type SelectedNotesList = {
  id: string;
  collectionId: string;
};

export type SelectedNote = {
  id: string;
  collectionId: string;
  notesListId: string;
};
