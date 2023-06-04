import { render } from "@testing-library/react";
import { testUser } from "../../../../test-utils/testData";
import ProfilePageContainer from "../ProfilePageContainer";

describe("ProfilePageContainer component", () => {
  test("Displays ProfilePageContainer component", () => {
    render(
      <ProfilePageContainer
        user={{
          stale: false,
          fetching: false,
          error: undefined,
          data: {
            user: {
              ...testUser,
            },
          },
        }}
        isMe={true}
      />
    );
  });
});
