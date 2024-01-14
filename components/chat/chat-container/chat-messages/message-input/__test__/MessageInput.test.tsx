import { render } from "@testing-library/react";
import { testChatPrivates } from "../../../../../../test-utils/testData";
import MessageInput from "../MessageInput";

describe("MessageInput component", () => {
  test("Displays the component successfully", () => {
    render(<MessageInput chat={testChatPrivates[0]} />);
  });
});
