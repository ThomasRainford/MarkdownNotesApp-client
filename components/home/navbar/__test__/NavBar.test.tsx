import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Client, Provider } from "urql";
import { fromValue } from "wonka";
import { sourceT } from "wonka/dist/types/src/Wonka_types.gen";
import { MeQuery, MeQueryVariables } from "../../../../generated/graphql";
import { createMockUrqlClient } from "../../../../test-utils/createMockUrqlClient";
import Navbar from "../NavBar";

describe("NavBar component", () => {
  test("Should display heading correctly", () => {
    const mockClient = createMockUrqlClient<
      MeQueryVariables,
      sourceT<{ data: MeQuery }>
    >({
      executeQuery: () => {
        return fromValue({
          data: {
            me: null,
          },
        });
      },
    });
    const navbar = render(
      <Provider value={mockClient as unknown as Client}>
        <Navbar />
      </Provider>
    );
    const heading = navbar.getByRole("heading");

    expect(heading.textContent).toMatch(/mdn notes/i);
  });

  test("Should display login button", () => {
    const mockClient = createMockUrqlClient<
      MeQueryVariables,
      sourceT<{ data: MeQuery }>
    >({
      executeQuery: () => {
        return fromValue({
          data: {
            me: null,
          },
        });
      },
    });
    const navbar = render(
      <Provider value={mockClient as unknown as Client}>
        <Navbar />
      </Provider>
    );

    const heading = navbar.getByRole("button", { name: /login/i });

    expect(heading.textContent).toMatch(/login/i);
  });

  test("Should display user menu", async () => {
    const username = "User01";

    const mockClient = createMockUrqlClient<
      MeQueryVariables,
      sourceT<{ data: MeQuery }>
    >({
      executeQuery: () => {
        return fromValue({
          data: {
            me: {
              _id: "id",
              id: "id",
              username,
              email: "User01@mail.com",
              followers: [] as string[],
              following: [] as string[],
              upvoted: [] as string[],
            },
          },
        });
      },
    });
    const navbar = render(
      <Provider value={mockClient as unknown as Client}>
        <Navbar />
      </Provider>
    );

    const avatarButton = await navbar.findByRole("button", {
      name: /open menu/i,
    });

    await act(async () => {
      fireEvent.click(avatarButton);
    });

    const usernameInMenu = navbar.getByText(username) as HTMLParagraphElement;

    expect(usernameInMenu.textContent).toBe(username);
  });
});
