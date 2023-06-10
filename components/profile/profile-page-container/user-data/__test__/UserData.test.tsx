import { render } from "@testing-library/react";
import UserData from "../UserData";

describe("UserData component", () => {
  test("Displays the given children", () => {
    render(
      <UserData
        userData={{
          __typename: undefined,
          _id: "",
          collections: [],
          createdAt: undefined,
          email: "",
          followers: [],
          following: [],
          id: "",
          updatedAt: undefined,
          upvoted: [],
          username: "",
        }}
        userCollectionsData={[]}
      />
    );
  });
});
