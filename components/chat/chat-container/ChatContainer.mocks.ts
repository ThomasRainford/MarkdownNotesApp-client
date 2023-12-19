import { testChatPrivates, testChatRooms } from "../../../test-utils/testData";
import { Props } from "./ChatContainer";

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

const base: Props = {
  chatPrivates,
  chatRooms,
};

export const mockChatsProps = {
  base,
};
