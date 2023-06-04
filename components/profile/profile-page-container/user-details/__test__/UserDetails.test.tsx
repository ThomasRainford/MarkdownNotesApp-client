import { render } from "@testing-library/react";
import { User } from "../../../../../generated/graphql";
import { testUsers } from "../../../../../test-utils/testData";
import UserDetails from "../UserDetails";

describe("UserDetails component", () => {
  test("Displays the UserDetails component successfully", () => {
    const user = testUsers[0] as User;
    const screen = render(<UserDetails user={user} isMe={true} />);

    const username = screen.getByText(user.username);

    expect(username).toBeInTheDocument();
  });

  test("displays user information correctly", () => {
    const user = testUsers[0] as User;
    const screen = render(<UserDetails user={user} isMe={true} />);

    const username = screen.getByText(user.username);
    const email = screen.getByText(user.email);
    const followers = screen.getByText(`${user.followers.length} followers`);
    const following = screen.getByText(`${user.following.length} following`);

    expect(username).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(followers).toBeInTheDocument();
    expect(following).toBeInTheDocument();
  });

  test("displays correct button text when current user 'is me'", () => {
    const user = testUsers[0] as User;
    const screen = render(<UserDetails user={user} isMe={true} />);

    const button = screen.getByRole("button", { name: /edit profile/i });

    expect(button).toBeInTheDocument();
  });

  test("displays correct button text when current user 'is not me'", () => {
    const user = testUsers[0] as User;
    const screen = render(<UserDetails user={user} isMe={false} />);

    const button = screen.getByRole("button", { name: /Follow/i });

    expect(button).toBeInTheDocument();
  });
});
