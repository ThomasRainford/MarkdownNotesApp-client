import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { OperationResult } from "urql";
import { CreateNotesListMutation, Exact } from "../../generated/graphql";

export const handleCreateNotesListErrors = (
  variables: Exact<{
    collectionId: string;
    title: string;
  }>,
  result: OperationResult<
    CreateNotesListMutation,
    Exact<{
      collectionId: string;
      title: string;
    }>
  >,
  toast: (options?: UseToastOptions | undefined) => ToastId
) => {
  let hasError = false;
  if (result.data?.createNotesList.error) {
    if (variables.title === "") {
      toast({
        id: "create-noteslist-error-1",
        title: "Failed to create List",
        description: "List title cannot be empty.",
        status: "error",
        position: "top",
        duration: 2000,
      });
      hasError = true;
    } else {
      toast({
        id: "create-noteslist-error-2",
        title: "Failed to create List",
        description: `List with title "${variables.title}" already exists.`,
        status: "error",
        position: "top",
        duration: 2000,
      });
      hasError = true;
    }
  }
  return hasError;
};
