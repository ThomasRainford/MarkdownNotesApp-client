import { testUser } from "../../../test-utils/testData";
import { Props } from "./NotesContainer";

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
  me: {
    stale: false,
    fetching: false,
    error: undefined,
    data: {
      me: {
        ...testUser,
      },
    },
  },
};

export const mockBaseTemplateProps = {
  base,
};
