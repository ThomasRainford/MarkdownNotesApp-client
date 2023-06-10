import { Props } from "./UserData";

const base: Props = {
  userData: {
    __typename: undefined,
    _id: "",
    collections: [],
    createdAt: undefined,
    email: "",
    followers: [],
    following: [],
    id: "",
    updatedAt: undefined,
    upvoted: [],
    username: "",
  },
  userCollectionsData: [],
};

export const mockUserDataProps = {
  base,
};
