import { Collection, Note, NotesList } from "../../generated/graphql";
import {
  setCollectionValue,
  setNotesListValue,
  setNoteValue,
} from "../setLocalStorageValue";
import { useAllLocalStorageValues } from "./useAllLocalStorageValues";

export const useHandleCrossEditing = ({
  collections,
}: {
  collections: Collection[] | undefined;
}) => {
  const {
    selectedCollection: { selectedCollection, setSelectedCollection },
    selectedNotesList: { setSelectedList },
    selectedNote: { selectedNote, setSelectedNote },
  } = useAllLocalStorageValues();

  const collection = collections?.find(
    (collection) => collection.id === selectedCollection?.id
  );
  const list = collection?.lists.find(
    (list) => list.id === selectedNote?.notesListId
  );
  const note = list?.notes.find((note) => note.id === selectedNote?.id);

  const handler = () => {
    let notesCollection: Collection | undefined = collection;
    let notesNotesList: NotesList | undefined = list;
    if (!list || !list.notes.find((n) => n.id === note?.id)) {
      collections?.forEach((_collection) => {
        _collection.lists?.forEach((_list) => {
          _list.notes.forEach((_note: Note) => {
            if (_note.id === note?.id) {
              notesCollection = _collection as Collection;
              notesNotesList = _list as NotesList;
              setSelectedCollection(
                JSON.stringify(setCollectionValue(notesCollection))
              );
              setSelectedList(
                JSON.stringify(setNotesListValue(notesNotesList))
              );
              setSelectedNote(
                JSON.stringify(setNoteValue(_note, notesNotesList))
              );
            }
          });
        });
      });
    }
    return { notesCollection, notesNotesList };
  };

  return handler;
};
