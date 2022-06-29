import { render } from "@testing-library/react";
import Navbar from "../NavBar";

test("Should display heading correctly", () => {
  const homePage = render(<Navbar />);

  const heading = homePage.getByRole("heading");

  expect(heading.textContent).toMatch(/mdn notes/i);
});

test("Should display login button", () => {
  const homePage = render(<Navbar />);

  const heading = homePage.getByRole("button", { name: /login/i });

  expect(heading.textContent).toMatch(/login/i);
});
