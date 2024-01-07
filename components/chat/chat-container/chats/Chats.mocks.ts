import { testChatPrivates } from "../../../../test-utils/testData";
import { Props } from "./Chats";

const base: Props = {
  chats: testChatPrivates,
  selectedChatState: ["selectedChat", () => {}],
};

export const mockBaseTemplateProps = {
  base,
};
