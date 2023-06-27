import { testUsers } from "../../../../../test-utils/testData";
import { Props } from "./UserList";

const base: Props = {
  type: "followers",
  users: testUsers,
  me: testUsers[0],
};

export const mockUserListProps = {
  base,
};
