export type LocalStorageContextType<T> = [T, (value: T) => void];

export enum LocalStorageKeys {
  SELECTED_COLLECTION = "selectedCollection",
}
