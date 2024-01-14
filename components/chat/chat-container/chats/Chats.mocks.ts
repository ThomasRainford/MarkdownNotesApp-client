import { testChatPrivates, testUsers } from "../../../../test-utils/testData";
import { Props } from "./Chats";

const base: Props = {
  chats: testChatPrivates,
  selectedChatState: ["selectedChat", () => {}],
  me: testUsers[0],
};

export const mockBaseTemplateProps = {
  base,
};
