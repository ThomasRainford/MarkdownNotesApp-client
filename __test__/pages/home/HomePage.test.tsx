import { render } from "@testing-library/react";
import { Client, Provider } from "urql";
import { fromValue } from "wonka";
import { sourceT } from "wonka/dist/types/src/Wonka_types.gen";
import { MeQuery, MeQueryVariables } from "../../../generated/graphql";
import Home from "../../../pages/index";
import { createMockUrqlClient } from "../../../test-utils/createMockUrqlClient";

describe("Home page", () => {
  test("Should display heading correctly", () => {
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
    const homePage = render(
      <Provider value={mockClient as unknown as Client}>
        <Home />
      </Provider>
    );

    const heading = homePage.getByRole("heading");

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
    const homePage = render(
      <Provider value={mockClient as unknown as Client}>
        <Home />
      </Provider>
    );
    const heading = homePage.getByRole("button", { name: /login/i });

    expect(heading.textContent).toMatch(/login/i);
  });
});
