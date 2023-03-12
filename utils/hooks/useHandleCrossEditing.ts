import { Collection, Note, NotesList } from "../../generated/graphql";
import { useAllLocalStorageValues } from "./useAllLocalStorageValues";

export const useHandleCrossEditing = ({
  collections,
}: {
  collections: Collection[] | undefined;
}) => {
  const {
    collection: { collection: selectedCollection, setSelectedCollection },
    list: { list, setSelectedList },
    note: { note, setSelectedNote },
  } = useAllLocalStorageValues();

  const handler = () => {
    let notesCollection: Collection = selectedCollection;
    let notesNotesList: NotesList = list;
    if ((list as any) === "" || !list.notes.find((n) => n.id === note.id)) {
      collections?.forEach((_collection) => {
        _collection.lists?.forEach((_list) => {
          _list.notes.forEach((_note: Note) => {
            if (_note.id === note.id) {
              notesCollection = _collection as Collection;
              notesNotesList = _list as NotesList;
              setSelectedCollection(JSON.stringify(notesCollection));
              setSelectedList(JSON.stringify(notesNotesList));
              setSelectedNote(JSON.stringify(_note));
            }
          });
        });
      });
    }
    return { notesCollection, notesNotesList };
  };

  return handler;
};
