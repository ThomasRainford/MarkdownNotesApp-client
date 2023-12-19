import { render } from "@testing-library/react";
import {
  testChatPrivates,
  testChatRooms,
} from "../../../../test-utils/testData";
import ChatPageContainer from "../ChatContainer";

describe("ChatPageContainer component", () => {
  test("Displays the given children", () => {
    const chatPrivates = {
      stale: false,
      fetching: true,
      error: undefined,
      data: {
        chatPrivates: testChatPrivates,
      },
    };
    const chatRooms = {
      stale: false,
      fetching: true,
      error: undefined,
      data: {
        chatRooms: testChatRooms,
      },
    };
    render(
      <ChatPageContainer chatPrivates={chatPrivates} chatRooms={chatRooms} />
    );
  });
});
