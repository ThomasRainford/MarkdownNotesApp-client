import { Collection, Note, NotesList } from "../generated/graphql";

export const setCollectionValue = (collection: Collection) => {
  return {
    id: collection.id,
  };
};

export const setNotesListValue = (notesList: NotesList) => {
  return {
    id: notesList.id,
    collectionId: notesList.collection.id,
  };
};

export const setNoteValue = (note: Note, notesList: NotesList) => {
  return {
    id: note.id,
    collectionId: notesList.collection.id,
    notesListId: notesList.id,
  };
};
