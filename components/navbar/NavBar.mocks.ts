import { Props } from "./NavBar";

const base: Props = {
  user: {
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
  },
};

export const mockBaseTemplateProps = {
  base,
};
