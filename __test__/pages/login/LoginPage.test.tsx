import { fireEvent, render, screen } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { act } from "react-dom/test-utils";
import { Client, Provider } from "urql";
import { fromValue } from "wonka";
import { type sourceT } from "wonka/dist/types/src/Wonka_types.gen";
import {
  LoginMutation,
  LoginMutationVariables,
  MeQuery,
} from "../../../generated/graphql";
import Login from "../../../pages/account/login";
import { createMockRouter } from "../../../test-utils/createMockRouter";
import { createMockUrqlClient } from "../../../test-utils/createMockUrqlClient";

describe("Home Page", () => {
  test("Should login", async () => {
    const mockClient = createMockUrqlClient<
      LoginMutationVariables,
      sourceT<{ data: LoginMutation | MeQuery }>
    >({
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
      executeQuery: () => {
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
      },
    });
    const mockRouter = createMockRouter({});
    render(
      <RouterContext.Provider value={mockRouter}>
        <Provider value={mockClient as unknown as Client}>
          <Login />
        </Provider>
      </RouterContext.Provider>
    );

    const usernameOrEmailInput = screen.getByRole("textbox", {
      name: /Username or Email address/i,
    }) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /password/i
    ) as HTMLInputElement;
    const signInButton = screen.getByRole("button", { name: /sign in/i });
    // Enter login details.
    const username = "User01";
    const password = "password";
    await act(async () => {
      fireEvent.change(usernameOrEmailInput, { target: { value: username } });
      fireEvent.change(passwordInput, { target: { value: password } });
    });
    // Expect inputs to be filled.
    expect(usernameOrEmailInput.value).toBe(username);
    expect(passwordInput.value).toBe(password);
    // Click sign in button to login.
    await act(async () => {
      fireEvent.click(signInButton);
    });
    // Pushing '/' means login was successful.
    expect(mockRouter.push).toBeCalledWith("/");
    // Expect inputs to be reset.
    expect(usernameOrEmailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
  });

  test("Should fail to login", async () => {
    const mockClient = createMockUrqlClient<
      LoginMutationVariables,
      sourceT<{ data: LoginMutation }>
    >({
      executeMutation: () => {
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
      },
    });
    const mockRouter = createMockRouter({});
    render(
      <RouterContext.Provider value={mockRouter}>
        <Provider value={mockClient as unknown as Client}>
          <Login />
        </Provider>
      </RouterContext.Provider>
    );

    const usernameOrEmailInput = screen.getByRole("textbox", {
      name: /Username or Email address/i,
    }) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /password/i
    ) as HTMLInputElement;
    const signInButton = screen.getByRole("button", { name: /sign in/i });
    // Enter login details.
    const username = "User01";
    const password = "password";
    await act(async () => {
      fireEvent.change(usernameOrEmailInput, { target: { value: username } });
      fireEvent.change(passwordInput, { target: { value: password } });
    });
    // Expect inputs to be filled.
    expect(usernameOrEmailInput.value).toBe(username);
    expect(passwordInput.value).toBe(password);
    // Click sign in button to login.
    await act(async () => {
      fireEvent.click(signInButton);
    });
    expect(mockRouter.push).toBeCalledTimes(0);

    // Expect inputs to be reset.
    expect(usernameOrEmailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
  });
});
