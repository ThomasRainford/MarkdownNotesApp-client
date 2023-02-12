import { UseMutationState } from "urql";
import {
  UpdateCollectionMutation,
  UpdateCollectionMutationVariables,
  UpdateNotesListMutation,
  UpdateNotesListMutationVariables,
} from "../../generated/graphql";
import { useAllLocalStorageValues } from "./useAllLocalStorageValues";

export const useUpdateItem = () => {
  const {
    collection: { setSelectedCollection },
    list: { setSelectedList },
  } = useAllLocalStorageValues();

  const updateFunc = async (
    type: "collection" | "list",
    data: UpdateCollectionMutationVariables | UpdateNotesListMutationVariables,
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
    } else {
      const result = (await updateMutationFunc(
        data
      )) as UseMutationState<UpdateNotesListMutation>;
      if (!result.data?.updateNotesList.error) {
        setSelectedList(JSON.stringify(result.data?.updateNotesList.notesList));
        return result;
      }
    }
  };

  return [updateFunc];
};
