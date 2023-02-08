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
} from "../../generated/graphql";
import { createMockUrqlClient } from "../createMockUrqlClient";
import { testNotesLists, _testCollections } from "../testData";

export const mockClient = createMockUrqlClient<
  | CollectionsQueryVariables
  | NotesListsQueryVariables
  | NotesListQueryVariables
  | LoginMutationVariables
  | MeQueryVariables,
  sourceT<{
    data:
      | CollectionsQuery
      | NotesListsQuery
      | NotesListQuery
      | LoginMutation
      | MeQuery;
  }>
>({
  executeQuery: ({ query }) => {
    const queryType = (query.definitions[0].name.value as string).toLowerCase();
    console.log(queryType);
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
  executeMutation: (query: { variables: LoginMutationVariables }) => {
    const variables = query.variables;
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
  },
});
