import { Collection, Note, NotesList } from "../generated/graphql";
import {
  SelectedCollection,
  SelectedNote,
  SelectedNotesList,
} from "./types/types";

export const getSelectedCollection = (
  selectedCollection: SelectedCollection | null,
  collections: Collection[]
): Collection | null => {
  if (!selectedCollection) return null;
  return (
    collections?.find(
      (collection) => collection.id === selectedCollection.id
    ) || null
  );
};

export const getSelectedNotesList = (
  selectedNotesList: SelectedNotesList | null,
  notesList: NotesList[]
): NotesList | null => {
  if (!selectedNotesList) return null;
  return (
    notesList.find((notesList) => notesList.id === selectedNotesList.id) || null
  );
};

export const getSelectedNotes = (
  selectedNote: SelectedNote | null,
  notes: Note[]
): Note | null => {
  if (!selectedNote) return null;
  return notes.find((note) => note.id === selectedNote.id) || null;
};
