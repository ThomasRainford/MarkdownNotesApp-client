import { testMessages, testUsers } from "../../../../../test-utils/testData";
import { Props } from "./Messages";

const base: Props = {
  messages: testMessages,
  me: testUsers[0],
};

export const mockMessageProps = {
  base,
};
