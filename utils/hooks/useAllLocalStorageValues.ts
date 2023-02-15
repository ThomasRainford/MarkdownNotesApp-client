import { SelectedCollectionContext } from "../../contexts/SelectedCollectionContext";
import { SelectedListContext } from "../../contexts/SelectedListContext";
import { SelectedNoteContext } from "../../contexts/SelectedNoteContext";
import { Collection, Note, NotesList } from "../../generated/graphql";
import { getLocalStorageValue } from "../getLocalStorageValue";
import { LocalStorageContextType, LocalStorageKeys } from "../types/types";
import { useLocalStorageValue } from "./useLocalStorageValue";

export const useAllLocalStorageValues = () => {
  const [selectedCollection, setSelectedCollection] = useLocalStorageValue(
    SelectedCollectionContext,
    LocalStorageKeys.SELECTED_COLLECTION
  ) as LocalStorageContextType;
  const [selectedList, setSelectedList] = useLocalStorageValue(
    SelectedListContext,
    LocalStorageKeys.SELECTED_LIST
  ) as LocalStorageContextType;
  const [selectedNote, setSelectedNote] = useLocalStorageValue(
    SelectedNoteContext,
    LocalStorageKeys.SELECTED_NOTE
  ) as LocalStorageContextType;
  const collection = getLocalStorageValue(selectedCollection) as Collection;
  const list = getLocalStorageValue(selectedList) as NotesList;
  const note = getLocalStorageValue(selectedNote) as Note;

  return {
    collection: { collection, setSelectedCollection },
    list: { list, setSelectedList },
    note: { note, setSelectedNote },
  };
};
