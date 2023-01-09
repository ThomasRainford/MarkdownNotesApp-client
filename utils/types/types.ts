export type LocalStorageContextType = [string, (value: string) => void];

export enum LocalStorageKeys {
  SELECTED_COLLECTION = "selectedCollection",
  SELECTED_LIST = "selectedList",
  SELECTED_NOTE = "selectedNote",
}
