import { fromValue } from "wonka";
import { sourceT } from "wonka/dist/types/src/Wonka_types.gen";
import {
  CollectionsQuery,
  CollectionsQueryVariables,
  LoginMutation,
  LoginMutationVariables,
  MeQuery,
  MeQueryVariables,
  NotesListQuery,
  NotesListQueryVariables,
  NotesListsQuery,
  NotesListsQueryVariables,
  RegisterMutation,
  RegisterMutationVariables,
  UpdateCollectionMutation,
  UpdateCollectionMutationVariables,
  UpdateNotesListMutation,
  UpdateNotesListMutationVariables,
} from "../../generated/graphql";
import { createMockUrqlClient } from "../createMockUrqlClient";
import { testNotesLists, _testCollections } from "../testData";

type MockClientOptions = {
  register?: "success" | "error";
  login?: "success" | "error";
};

export const mockClient = (options?: MockClientOptions) =>
  createMockUrqlClient<
    | CollectionsQueryVariables
    | NotesListsQueryVariables
    | NotesListQueryVariables
    | MeQueryVariables
    | LoginMutationVariables
    | RegisterMutationVariables
    | UpdateCollectionMutationVariables
    | UpdateNotesListMutationVariables,
    sourceT<{
      data:
        | CollectionsQuery
        | NotesListsQuery
        | NotesListQuery
        | MeQuery
        | LoginMutation
        | RegisterMutation
        | UpdateCollectionMutation
        | UpdateNotesListMutation;
    }>
  >({
    executeQuery: ({ query }) => {
      const queryType = (
        query.definitions[0].name.value as string
      ).toLowerCase();
      switch (queryType) {
        case "collections":
          return fromValue({
            data: {
              collections: _testCollections,
            },
          });
        case "noteslists":
          return fromValue({
            data: {
              notesLists: testNotesLists.collection1,
            },
          });
        case "noteslist":
          return fromValue({
            data: {
              notesList: testNotesLists.collection1[0],
            },
          });
        case "me":
          return fromValue({
            data: {
              me: {
                _id: "id",
                id: "id",
                username: "User01",
                email: "User01@mail.com",
                followers: [] as string[],
                following: [] as string[],
                upvoted: [] as string[],
              },
            },
          });
        default:
          break;
      }
    },
    executeMutation: ({ query, variables }) => {
      const queryType = (
        query.definitions[0].name.value as string
      ).toLowerCase();
      switch (queryType) {
        case "login":
          if (options?.login === "success") {
            return fromValue({
              data: {
                login: {
                  user: {
                    id: "1",
                    username: variables.usernameOrEmail,
                    email: "mail@test.com",
                  },
                  errors: null,
                },
              },
            });
          } else {
            return fromValue({
              data: {
                login: {
                  user: null,
                  errors: [
                    {
                      field: "usernameOrEmail",
                      message: "Invalid username or email",
                    },
                  ],
                },
              },
            });
          }
        case "register":
          if (options?.register === "success") {
            return fromValue({
              data: {
                register: {
                  user: {
                    id: "1",
                    username: variables.registerInput.username,
                    email: variables.registerInput.email,
                  },
                  errors: null,
                },
              },
            });
          } else {
            return fromValue({
              data: {
                register: {
                  user: null,
                  errors: [
                    {
                      field: "email",
                      message: "Invalid email address",
                    },
                  ],
                },
              },
            });
          }
        case "updatecollection":
          return fromValue({
            data: {
              updateCollection: {
                collection: {
                  id: "1",
                  title: "Collection 1 updated",
                  visibility: "public",
                  upvotes: 0,
                  createdAt: "",
                  updatedAt: "",
                  owner: {
                    id: "1",
                    username: "User01",
                  },
                  lists: [
                    {
                      id: "1",
                      title: "List 11",
                    },
                  ],
                },
                error: null,
              },
            },
          });
        case "updatenoteslist":
          return fromValue({
            data: {
              updateNotesList: {
                notesList: {
                  id: "1",
                  title: "List 1 updated",
                  createdAt: "",
                  updatedAt: "",
                  collection: {
                    id: "1",
                  },
                  notes: [
                    {
                      id: "noteid",
                      title: "Note 1",
                      body: "Body 1",
                      createdAt: "",
                      updatedAt: "",
                    },
                  ],
                },
                error: null,
              },
            },
          });
        default:
          break;
      }
    },
  });
