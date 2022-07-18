import { fireEvent, render, screen } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { act } from "react-dom/test-utils";
import { Client, Provider } from "urql";
import { fromValue } from "wonka";
import { type sourceT } from "wonka/dist/types/src/Wonka_types.gen";
import {
  MeQuery,
  RegisterMutation,
  RegisterMutationVariables,
} from "../../../generated/graphql";
import Register from "../../../pages/account/register";
import { createMockRouter } from "../../../test-utils/createMockRouter";
import { createMockUrqlClient } from "../../../test-utils/createMockUrqlClient";

describe("Register Page", () => {
  test("Should register successfully", async () => {
    const mockClient = createMockUrqlClient<
      RegisterMutationVariables,
      sourceT<{ data: RegisterMutation | MeQuery }>
    >({
      executeMutation: (query: { variables: RegisterMutationVariables }) => {
        const variables = query.variables;
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
          <Register />
        </Provider>
      </RouterContext.Provider>
    );
    const usernameInput = screen.getByRole("textbox", {
      name: /username/i,
    }) as HTMLInputElement;
    const emailInput = screen.getByRole("textbox", {
      name: /email address/i,
    }) as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText(
      /confirm password/i
    ) as HTMLInputElement;
    const registerButton = screen.getByRole("button", { name: /register/i });
    // Enter login details
    const username = "User01";
    const email = "user01@mail.com";
    const password = "password";
    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: username } });
      fireEvent.change(emailInput, { target: { value: email } });
      fireEvent.change(passwordInput, { target: { value: password } });
      fireEvent.change(confirmPasswordInput, { target: { value: password } });
    });
    // Expect inputs to be filled.
    expect(usernameInput.value).toBe(username);
    expect(emailInput.value).toBe(email);
    expect(passwordInput.value).toBe(password);
    expect(confirmPasswordInput.value).toBe(password);
    // Click sign in button to login.
    await act(async () => {
      fireEvent.click(registerButton);
    });
    // Pushing '/' means login was successful.
    expect(mockRouter.push).toBeCalledWith("/");
    // Expect inputs to be reset.
    expect(usernameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
    expect(confirmPasswordInput.value).toBe("");
  });

  test("Should fail to register", async () => {
    const mockClient = createMockUrqlClient<
      RegisterMutationVariables,
      sourceT<{ data: RegisterMutation | MeQuery }>
    >({
      executeMutation: () => {
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
          <Register />
        </Provider>
      </RouterContext.Provider>
    );
    const usernameInput = screen.getByRole("textbox", {
      name: /username/i,
    }) as HTMLInputElement;
    const emailInput = screen.getByRole("textbox", {
      name: /email address/i,
    }) as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText(
      /confirm password/i
    ) as HTMLInputElement;
    const registerButton = screen.getByRole("button", { name: /register/i });
    // Enter login details
    const username = "User01";
    const email = "user01@mail.com";
    const password = "password";
    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: username } });
      fireEvent.change(emailInput, { target: { value: email } });
      fireEvent.change(passwordInput, { target: { value: password } });
      fireEvent.change(confirmPasswordInput, { target: { value: password } });
    });
    // Expect inputs to be filled.
    expect(usernameInput.value).toBe(username);
    expect(emailInput.value).toBe(email);
    expect(passwordInput.value).toBe(password);
    expect(confirmPasswordInput.value).toBe(password);
    // Click sign in button to login.
    await act(async () => {
      fireEvent.click(registerButton);
    });
    // Pushing '/' means login was successful.
    expect(mockRouter.push).toBeCalledTimes(0);
    // Expect inputs to be reset.
    expect(usernameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
    expect(confirmPasswordInput.value).toBe("");
  });
});
