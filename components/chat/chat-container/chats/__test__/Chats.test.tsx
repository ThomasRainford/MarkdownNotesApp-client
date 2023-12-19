import { render } from "@testing-library/react";
import {
  testChatPrivates,
  testChatRooms,
} from "../../../../../test-utils/testData";
import Chats from "../Chats";

describe("Chats component", () => {
  test("Displays the component successfully", () => {
    render(
      <Chats
        chats={[...testChatPrivates, ...testChatRooms]}
        selectedChatState={["selectedChat", jest.fn()]}
      />
    );
  });
});
