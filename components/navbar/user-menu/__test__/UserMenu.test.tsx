import { fireEvent, render, screen } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { act } from "react-dom/test-utils";
import { Client, Provider } from "urql";
import { fromValue } from "wonka";
import { sourceT } from "wonka/dist/types/src/Wonka_types.gen";
import {
  LogoutMutation,
  LogoutMutationVariables,
} from "../../../../generated/graphql";
import { createMockRouter } from "../../../../test-utils/createMockRouter";
import { createMockUrqlClient } from "../../../../test-utils/createMockUrqlClient";
import UserMenu from "../UserMenu";

describe("UserMenu component", () => {
  test("Menu should display logged in users' name", async () => {
    const me = {
      data: {
        me: {
          _id: "id",
          username: "User01",
          email: "User01@mail.com",
          followers: [] as string[],
          following: [] as string[],
          upvoted: [] as string[],
        },
      },
      fetching: false,
      stale: false,
      error: undefined,
    };
    const mockClient = createMockUrqlClient<
      LogoutMutationVariables,
      sourceT<{ data: LogoutMutation }>
    >({
      executeQuery: () => {
        return fromValue({
          data: {
            logout: null,
          },
        });
      },
    });
    render(
      <Provider value={mockClient as unknown as Client}>
        <UserMenu user={me} />
      </Provider>
    );

    const username = me.data.me.username;
    const usernameInMenu = screen.getByText(username) as HTMLParagraphElement;

    expect(usernameInMenu.textContent).toBe(username);
  });

  test("Should logout successfully", async () => {
    const me = {
      data: {
        me: {
          _id: "id",
          username: "User01",
          email: "User01@mail.com",
          followers: [] as string[],
          following: [] as string[],
          upvoted: [] as string[],
        },
      },
      fetching: false,
      stale: false,
      error: undefined,
    };
    const mockClient = createMockUrqlClient<
      LogoutMutationVariables,
      sourceT<{ data: LogoutMutation }>
    >({
      executeMutation: () => {
        return fromValue({
          data: {
            logout: {
              username: "User01",
            },
          },
        });
      },
    });
    const mockRouter = createMockRouter({});
    render(
      <RouterContext.Provider value={mockRouter}>
        <Provider value={mockClient as unknown as Client}>
          <UserMenu user={me} />
        </Provider>
      </RouterContext.Provider>
    );

    const logoutButton = screen.getByTestId("logout-button");

    await act(async () => {
      fireEvent.click(logoutButton);
    });

    expect(mockRouter.push).toBeCalledWith("/account/login");
  });
});
