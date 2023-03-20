import { UseMutationState } from "urql";
import {
  UpdateCollectionMutation,
  UpdateCollectionMutationVariables,
  UpdateNoteMutation,
  UpdateNoteMutationVariables,
  UpdateNotesListMutation,
  UpdateNotesListMutationVariables,
} from "../../generated/graphql";
import { useAllLocalStorageValues } from "./useAllLocalStorageValues";

export const useUpdateItem = () => {
  const {
    collection: { setSelectedCollection },
    list: { setSelectedList },
    note: { setSelectedNote },
  } = useAllLocalStorageValues();

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
        setSelectedNote(JSON.stringify(result.data?.updateNote.note));
        return result;
      }
    }
  };

  return [updateFunc];
};
