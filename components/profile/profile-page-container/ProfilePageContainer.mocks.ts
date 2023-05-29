import { testUser } from "../../../test-utils/testData";
import { Props } from "./ProfilePageContainer";

const base: Props = {
  user: {
    stale: false,
    fetching: false,
    error: undefined,
    data: {
      user: {
        ...testUser,
      },
    },
  },
  isMe: false,
};

export const mockBaseTemplateProps = {
  base,
};
