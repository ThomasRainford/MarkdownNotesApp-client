import { render } from "@testing-library/react";
import UserDetails from "../UserDetails";

describe("UserDetails component", () => {
  test("Displays the UserDetails component successfully", () => {
    render(<UserDetails />);
  });
});
