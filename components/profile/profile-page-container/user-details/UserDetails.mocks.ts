import { User } from "../../../../generated/graphql";
import { Props } from "../user-details/UserDetails";

const base: Props = {
  user: {
    _id: "62c112b482c8f5360ce6dfcb",
    email: "user1@email.com",
    username: "User01",
    following: [],
    followers: [],
    upvoted: [],
    __typename: "User",
  } as unknown as User,
  isMe: true,
};

export const mockBaseTemplateProps = {
  base,
};
