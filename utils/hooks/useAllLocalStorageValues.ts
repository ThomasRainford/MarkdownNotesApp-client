import { SelectedCollectionContext } from "../../contexts/SelectedCollectionContext";
import { SelectedListContext } from "../../contexts/SelectedListContext";
import { SelectedNoteContext } from "../../contexts/SelectedNoteContext";
import { getLocalStorageValue } from "../getLocalStorageValue";
import {
  LocalStorageContextType,
  SelectedCollection,
  SelectedNote,
  SelectedNotesList,
} from "../types/types";
import { useLocalStorageValue } from "./useLocalStorageValue";

export const useAllLocalStorageValues = () => {
  const [selectedCollectionString, setSelectedCollectionString] =
    useLocalStorageValue(SelectedCollectionContext) as LocalStorageContextType;
  const [selectedListString, setSelectedListString] = useLocalStorageValue(
    SelectedListContext
  ) as LocalStorageContextType;
  const [selectedNoteString, setSelectedNoteString] = useLocalStorageValue(
    SelectedNoteContext
  ) as LocalStorageContextType;
  const selectedCollection = getLocalStorageValue(
    selectedCollectionString
  ) as SelectedCollection | null;
  const selectedList = getLocalStorageValue(
    selectedListString
  ) as SelectedNotesList | null;
  const selectedNote = getLocalStorageValue(
    selectedNoteString
  ) as SelectedNote | null;

  return {
    selectedCollection: {
      selectedCollection,
      setSelectedCollection: setSelectedCollectionString,
    },
    selectedNotesList: {
      selectedList,
      setSelectedList: setSelectedListString,
    },
    selectedNote: { selectedNote, setSelectedNote: setSelectedNoteString },
  };
};
