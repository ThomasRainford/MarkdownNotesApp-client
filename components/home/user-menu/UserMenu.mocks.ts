import { Props } from "./UserMenu";

const base: Props = {
  me: {
    data: {
      me: {
        _id: "id",
        username: "User01",
        email: "User01@mail.com",
        followers: [] as string[],
        following: [] as string[],
        upvoted: [] as string[],
      },
    },
    fetching: false,
    stale: false,
    error: undefined,
  },
};

export const mockBaseTemplateProps = {
  base,
};
