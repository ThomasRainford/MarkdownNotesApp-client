import { testUsers } from "../../../../../test-utils/testData";
import { Props } from "./UserList";

const base: Props = {
  type: "followers",
  users: testUsers,
};

export const mockUserListProps = {
  base,
};
