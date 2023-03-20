import { fromValue } from "wonka";
import { sourceT } from "wonka/dist/types/src/Wonka_types.gen";
import {
  AddNoteMutation,
  AddNoteMutationVariables,
  CollectionsQuery,
  CollectionsQueryVariables,
  CreateCollectionMutation,
  CreateCollectionMutationVariables,
  CreateNotesListMutation,
  CreateNotesListMutationVariables,
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
  UpdateNoteMutation,
  UpdateNoteMutationVariables,
  UpdateNotesListMutation,
  UpdateNotesListMutationVariables,
} from "../../generated/graphql";
import { createMockUrqlClient } from "../createMockUrqlClient";
import {
  createCollectionCollections,
  createNoteNotesList,
  createNotesListNoteLists,
  testNotesLists,
  _testCollections,
} from "../testData";

type MockClientOptions = {
  register?: "success" | "error";
  login?: "success" | "error";
  collection?: {
    create?: "success" | "error";
  };
  noteslist?: {
    create?: "success" | "error";
  };
  note?: {
    create?: "success" | "error";
    update?: {
      title?: string;
      body?: string;
    };
  };
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
    | UpdateNotesListMutationVariables
    | UpdateNoteMutationVariables
    | CreateCollectionMutationVariables
    | CreateNotesListMutationVariables
    | AddNoteMutationVariables,
    sourceT<{
      data:
        | CollectionsQuery
        | NotesListsQuery
        | NotesListQuery
        | MeQuery
        | LoginMutation
        | RegisterMutation
        | UpdateCollectionMutation
        | UpdateNotesListMutation
        | UpdateNoteMutation
        | CreateCollectionMutation
        | CreateNotesListMutation
        | AddNoteMutation;
    }>
  >({
    executeQuery: ({ query }) => {
      const queryType = (
        query.definitions[0].name.value as string
      ).toLowerCase();
      switch (queryType) {
        case "collections":
          let collections = _testCollections;
          if (options?.collection?.create === "success") {
            collections = createCollectionCollections;
          }
          return fromValue({
            data: {
              collections,
            },
          });
        case "noteslists":
          let notesLists = testNotesLists.collection1;
          if (options?.noteslist?.create === "success") {
            notesLists = createNotesListNoteLists;
          }
          return fromValue({
            data: {
              notesLists,
            },
          });
        case "noteslist":
          let notesList = testNotesLists.collection1[0];
          if (options?.note?.create === "success") {
            notesList = createNoteNotesList;
          }
          return fromValue({
            data: {
              notesList,
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
        case "updatenote":
          if (options?.note?.update?.title) {
            return fromValue({
              data: {
                updateNote: {
                  note: {
                    id: "1",
                    title: options?.note?.update?.title || "",
                    body: "",
                    createdAt: "2022-08-28T08:52:02.025Z",
                    updatedAt: "2022-08-28T08:52:02.025Z",
                  },
                  error: null,
                },
              },
            });
          } else {
            return fromValue({
              data: {
                updateNote: {
                  note: {
                    id: "1",
                    title: "Title",
                    body: options?.note?.update?.body || "",
                    createdAt: "2022-08-28T08:52:02.025Z",
                    updatedAt: "2022-08-28T08:52:02.025Z",
                  },
                  error: null,
                },
              },
            });
          }
        case "createcollection":
          if (options?.collection?.create === "error") {
            return fromValue({
              data: {
                createCollection: {
                  error: {
                    property: "title",
                    message: "'title' cannot be empty.",
                  },
                },
              },
            });
          } else {
            return fromValue({
              data: {
                createCollection: {
                  collection: {
                    id: "4",
                    title: "Collection 4",
                  },
                  error: null,
                },
              },
            });
          }
        case "createnoteslist":
          if (options?.noteslist?.create === "error") {
            return fromValue({
              data: {
                createNotesList: {
                  error: {
                    property: "title",
                    message: "'title' cannot be empty.",
                  },
                },
              },
            });
          } else {
            return fromValue({
              data: {
                createNotesList: {
                  notesList: {
                    id: "2",
                    title: "List 2",
                  },
                  error: null,
                },
              },
            });
          }
        case "addnote":
          if (options?.note?.create === "error") {
            return fromValue({
              data: {
                addNote: {
                  error: {
                    property: "title",
                    message: "'title' cannot be empty.",
                  },
                },
              },
            });
          } else {
            return fromValue({
              data: {
                addNote: {
                  note: {
                    id: "2",
                    title: "Note 2",
                    body: "",
                    createdAt: "2022-08-28T08:52:02.025Z",
                    updatedAt: "2022-08-28T08:52:02.025Z",
                  },
                  error: null,
                },
              },
            });
          }
        default:
          break;
      }
    },
  });
