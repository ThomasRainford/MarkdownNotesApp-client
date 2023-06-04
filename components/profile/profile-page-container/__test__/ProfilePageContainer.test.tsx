import { render } from "@testing-library/react";
import { UseQueryState } from "urql";
import { Exact, UserQuery } from "../../../../generated/graphql";
import { testUsers } from "../../../../test-utils/testData";
import ProfilePageContainer from "../ProfilePageContainer";

describe("ProfilePageContainer component", () => {
  test("Displays ProfilePageContainer component", () => {
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
    render(<ProfilePageContainer user={userResult} isMe={true} />);
  });

  test("displays loading component", () => {
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
    const screen = render(
      <ProfilePageContainer user={userResult} isMe={true} />
    );

    const spinner = screen.getByText("Loading...");

    expect(spinner).toBeInTheDocument();
  });

  test("displays error component", () => {
    const userResult = {
      stale: false,
      fetching: true,
      error: {
        message: "Error",
      },
      data: null,
    } as unknown as UseQueryState<
      UserQuery,
      Exact<{
        username: string;
      }>
    >;
    const screen = render(
      <ProfilePageContainer user={userResult} isMe={true} />
    );

    const errorText = screen.getByText(
      "An error has occured aquiring this users' data."
    );

    expect(errorText).toBeInTheDocument();
  });
});
