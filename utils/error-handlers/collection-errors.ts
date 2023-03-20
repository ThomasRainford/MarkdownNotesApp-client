import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { OperationResult } from "urql";
import { CreateCollectionMutation, Exact } from "../../generated/graphql";

export const handleCreateCollectionErrors = (
  variables: Exact<{
    title: string;
    visibility: string;
  }>,
  result: OperationResult<
    CreateCollectionMutation,
    Exact<{
      title: string;
      visibility: string;
    }>
  >,
  toast: (options?: UseToastOptions | undefined) => ToastId
) => {
  let hasError = false;
  if (result.data?.createCollection.error) {
    if (variables.title === "") {
      toast({
        id: "create-collection-error-1",
        title: "Failed to create Collection",
        description: "Collection title cannot be empty.",
        status: "error",
        position: "top",
        duration: 2000,
      });
      hasError = true;
    } else {
      toast({
        id: "create-collection-error-2",
        title: "Failed to create Collection",
        description: `Collection with title "${variables.title}" already exists.`,
        status: "error",
        position: "top",
        duration: 2000,
      });
      hasError = true;
    }
  }
  return hasError;
};
