import { testChatPrivates, testUsers } from "../../../../test-utils/testData";
import { Props } from "./ChatMessages";

const base: Props = {
  chat: testChatPrivates[0],
  me: testUsers[0],
};

export const mockChatMessagesProps = {
  base,
};
