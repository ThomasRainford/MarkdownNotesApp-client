import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { OperationResult } from "urql";
import {
  AddNoteMutation,
  Exact,
  ListLocationInput,
  NoteInput,
} from "../../generated/graphql";

export const handleAddNoteErrors = (
  variables: Exact<{
    listLocation: ListLocationInput;
    noteInput: NoteInput;
  }>,
  result: OperationResult<
    AddNoteMutation,
    Exact<{
      listLocation: ListLocationInput;
      noteInput: NoteInput;
    }>
  >,
  toast: (options?: UseToastOptions | undefined) => ToastId
) => {
  let hasError = false;
  if (result.data?.addNote.error) {
    if (variables.noteInput.title === "") {
      toast({
        id: "add-note-error-1",
        title: "Failed to add Note",
        description: "Note title cannot be empty.",
        status: "error",
        position: "top",
        duration: 2000,
      });
      hasError = true;
    } else {
      toast({
        id: "add-note-error-2",
        title: "Failed to create Note",
        status: "error",
        position: "top",
        duration: 2000,
      });
      hasError = true;
    }
  }
  return hasError;
};
