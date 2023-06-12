import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Client, Provider } from "urql";
import { fromValue } from "wonka";
import { sourceT } from "wonka/dist/types/src/Wonka_types.gen";
import { MeQuery, MeQueryVariables } from "../../../generated/graphql";
import { createMockUrqlClient } from "../../../test-utils/createMockUrqlClient";
import SelectedDataProvider from "../../helper/SelectedDataProvider";
import Navbar from "../NavBar";

describe("NavBar component", () => {
  test("Should display heading correctly", () => {
    const mockMeResponse = {
      data: {
        me: null,
      },
      fetching: false,
      stale: false,
    };
    const mockClient = createMockUrqlClient<
      MeQueryVariables,
      sourceT<{ data: MeQuery }>
    >({
      executeQuery: () => {
        return fromValue(mockMeResponse);
      },
    });
    const navbar = render(
      <Provider value={mockClient as unknown as Client}>
        <Navbar user={mockMeResponse} />
      </Provider>
    );
    const heading = navbar.getByRole("heading");

    expect(heading.textContent).toMatch(/mdn notes/i);
  });

  test("Should display login button", () => {
    const mockMeResponse = {
      data: {
        me: null,
      },
      fetching: false,
      stale: false,
    };
    const mockClient = createMockUrqlClient<
      MeQueryVariables,
      sourceT<{ data: MeQuery }>
    >({
      executeQuery: () => {
        return fromValue(mockMeResponse);
      },
    });
    const navbar = render(
      <Provider value={mockClient as unknown as Client}>
        <Navbar user={mockMeResponse} />
      </Provider>
    );

    const heading = navbar.getByRole("button", { name: /login/i });

    expect(heading.textContent).toMatch(/login/i);
  });

  test("Should display user menu", async () => {
    const mockMeResponse = {
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
    };
    const mockClient = createMockUrqlClient<
      MeQueryVariables,
      sourceT<{ data: MeQuery }>
    >({
      executeQuery: () => {
        return fromValue(mockMeResponse);
      },
    });
    const navbar = render(
      <Provider value={mockClient as unknown as Client}>
        <SelectedDataProvider>
          <Navbar user={mockMeResponse} />
        </SelectedDataProvider>
      </Provider>
    );

    const avatarButton = await navbar.findByRole("button", {
      name: /open menu/i,
    });

    await act(async () => {
      fireEvent.click(avatarButton);
    });

    const username = mockMeResponse.data.me.username;
    const usernameInMenu = navbar.getByText(username) as HTMLParagraphElement;

    expect(usernameInMenu.textContent).toBe(username);
  });
});
