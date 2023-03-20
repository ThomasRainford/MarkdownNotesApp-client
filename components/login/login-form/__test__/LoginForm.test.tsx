import { fireEvent, render, screen } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { act } from "react-dom/test-utils";
import { Client, Provider } from "urql";
import { createMockRouter } from "../../../../test-utils/createMockRouter";
import { mockClient } from "../../../../test-utils/mocks/gql-mocks";
import LoginForm from "../LoginForm";

describe("LoginForm component", () => {
  test("Should login successfully", async () => {
    const mockRouter = createMockRouter({});
    render(
      <RouterContext.Provider value={mockRouter}>
        <Provider value={mockClient({ login: "success" }) as unknown as Client}>
          <LoginForm />
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
    const mockRouter = createMockRouter({});
    render(
      <RouterContext.Provider value={mockRouter}>
        <Provider value={mockClient({ login: "error" }) as unknown as Client}>
          <LoginForm />
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

  test("Should fail to login with validation errors of 'Required'", async () => {
    const mockRouter = createMockRouter({});
    render(
      <RouterContext.Provider value={mockRouter}>
        <Provider value={mockClient({ login: "error" }) as unknown as Client}>
          <LoginForm />
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
    // Expect inputs to be empty.
    expect(usernameOrEmailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
    // Click sign in button to login.
    await act(async () => {
      fireEvent.click(signInButton);
    });
    expect(mockRouter.push).toBeCalledTimes(0);
    // Check form validation errors.
    const errors = screen.getAllByText(/required/i);
    errors.forEach((el) => expect(el.textContent).toBe("Required"));
    // Expect to have two errors.
    expect(errors).toHaveLength(2);
    // Expect inputs to be reset.
    expect(usernameOrEmailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
  });
});
