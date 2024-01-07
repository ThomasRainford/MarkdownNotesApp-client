import { render } from "@testing-library/react";
import { testMessages, testUsers } from "../../../../../test-utils/testData";
import ChatMessages from "../ChatMessages";

describe("ChatMessages component", () => {
  test("Displays the component successfully", () => {
    render(<ChatMessages messages={testMessages} me={testUsers[0]} />);
  });
});
