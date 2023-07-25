import { render } from "@testing-library/react";
import { UseQueryState } from "urql";
import { Exact, MeQuery, UserQuery } from "../../../../generated/graphql";
import { testUsers } from "../../../../test-utils/testData";
import NotesContainer from "../NotesContainer";

describe("NotesContainer component", () => {
  test("Displays NotesContainer component", () => {
    const userResult = {
      stale: false,
      fetching: true,
      error: undefined,
      data: {
        user: {
          ...testUsers[0],
        },
      },
    } as unknown as UseQueryState<
      UserQuery,
      Exact<{
        username: string;
      }>
    >;
    const meResult = {
      stale: false,
      fetching: true,
      error: undefined,
      data: {
        user: {
          ...testUsers[0],
        },
      },
    } as unknown as UseQueryState<
      MeQuery,
      Exact<{
        [key: string]: never;
      }>
    >;
    render(<NotesContainer user={userResult} me={meResult} />);
  });
});
