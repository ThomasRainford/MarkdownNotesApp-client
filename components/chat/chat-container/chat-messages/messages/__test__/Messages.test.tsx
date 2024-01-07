import { render } from "@testing-library/react";
import { testMessages, testUsers } from "../../../../../../test-utils/testData";
import Messages from "../Messages";

describe("Message component", () => {
  test("Displays the component successfully", () => {
    render(<Messages messages={testMessages} me={testUsers[0]} />);
  });
});
