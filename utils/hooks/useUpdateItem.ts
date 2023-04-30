import { UseMutationState } from "urql";
import {
  Note,
  NotesList,
  UpdateCollectionMutation,
  UpdateCollectionMutationVariables,
  UpdateNoteMutation,
  UpdateNoteMutationVariables,
  UpdateNotesListMutation,
  UpdateNotesListMutationVariables,
  useCollectionsQuery,
} from "../../generated/graphql";
import { setNoteValue } from "../setLocalStorageValue";
import { useAllLocalStorageValues } from "./useAllLocalStorageValues";

export const useUpdateItem = () => {
  const [collectionsResult] = useCollectionsQuery();
  const {
    selectedCollection: { setSelectedCollection },
    selectedNotesList: { setSelectedList },
    selectedNote: { selectedNote, setSelectedNote },
  } = useAllLocalStorageValues();
  const notesList = collectionsResult.data?.collections
    .find((collection) => collection.id === selectedNote?.collectionId)
    ?.lists.find((list) => list.id === selectedNote?.notesListId);

  const updateFunc = async (
    type: "collection" | "list" | "note",
    data:
      | UpdateCollectionMutationVariables
      | UpdateNotesListMutationVariables
      | UpdateNoteMutationVariables,
    updateMutationFunc: Function
  ) => {
    if (type === "collection") {
      const result = (await updateMutationFunc(
        data
      )) as UseMutationState<UpdateCollectionMutation>;
      if (!result.data?.updateCollection.error) {
        setSelectedCollection(
          JSON.stringify(result.data?.updateCollection.collection)
        );
        return result;
      }
    } else if (type === "list") {
      const result = (await updateMutationFunc(
        data
      )) as UseMutationState<UpdateNotesListMutation>;
      if (!result.data?.updateNotesList.error) {
        setSelectedList(JSON.stringify(result.data?.updateNotesList.notesList));
        return result;
      }
    } else if (type === "note") {
      const result = (await updateMutationFunc(
        data
      )) as UseMutationState<UpdateNoteMutation>;
      if (!result.data?.updateNote.error) {
        const selectValue = setNoteValue(
          result.data?.updateNote.note as Note,
          notesList as NotesList
        );
        setSelectedNote(JSON.stringify(selectValue));
        return result;
      }
    }
  };

  return [updateFunc];
};
