import { User } from "../../../../generated/graphql";
import { testUsers } from "../../../../test-utils/testData";
import { Props } from "../user-details/UserDetails";

const base: Props = {
  user: testUsers[0] as User,
  me: testUsers[0] as User,
};

export const mockBaseTemplateProps = {
  base,
};
