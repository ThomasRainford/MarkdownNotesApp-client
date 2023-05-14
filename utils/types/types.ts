export type LocalStorageContextType = [string, (value: string) => void];

export enum LocalStorageKeys {
  SELECTED_COLLECTION = "selectedCollection",
  SELECTED_LIST = "selectedList",
  SELECTED_NOTE = "selectedNote",
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
