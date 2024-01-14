import { render } from "@testing-library/react";
import {
  testChatPrivates,
  testUsers,
} from "../../../../../test-utils/testData";
import Chatinfo from "../ChatInfo";

describe("Chatinfo component", () => {
  test("Displays the component successfully", () => {
    render(<Chatinfo chat={testChatPrivates[0]} me={testUsers[0]} />);
  });
});
