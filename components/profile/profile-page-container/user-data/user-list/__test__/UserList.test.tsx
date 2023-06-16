import { render } from "@testing-library/react";
import { testUsers } from "../../../../../../test-utils/testData";
import UserList from "../UserList";

describe("UserList component", () => {
  test("Displays the UserList component", () => {
    const users = testUsers;
    render(<UserList users={users} />);
  });
});
