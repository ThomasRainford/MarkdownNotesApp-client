import { render } from "@testing-library/react";
import NavBar from "../../components/home/navbar/NavBar";

describe("NavBar", () => {
  test("Displays navbar heading correctly", () => {
    const navbar = render(<NavBar />);

    const heading = navbar.getByRole("heading", { name: /mdn notes/i });

    expect(heading).toBeInTheDocument();
  });

  test("Displays navbar login button correctly", () => {
    const navbar = render(<NavBar />);

    const loginButton = navbar.getByRole("button", { name: /login/i });

    expect(loginButton).toBeInTheDocument();
  });

  test("Displays navbar collection page link correctly", () => {
    const navbar = render(<NavBar />);

    const loginButton = navbar.getByRole("link", { name: /my collections/i });

    expect(loginButton).toBeInTheDocument();
  });
});
