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
    | RegisterMutationVariables,
    sourceT<{
      data:
        | CollectionsQuery
        | NotesListsQuery
        | NotesListQuery
        | MeQuery
        | LoginMutation
        | RegisterMutation;
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
                    id: "62c112b482c8f5360ce6dfcb",
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
                    id: "62c112b482c8f5360ce6dfcb",
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
        default:
          break;
      }
    },
  });
