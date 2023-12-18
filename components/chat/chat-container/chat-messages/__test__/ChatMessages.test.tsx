import { render } from "@testing-library/react";
import { Message } from "../../../../../generated/graphql";
import ChatMessages from "../ChatMessages";

describe("BaseTemplate component", () => {
  test("Displays the given children", () => {
    const messages: Message[] = [];

    render(<ChatMessages messages={messages} />);
  });
});
