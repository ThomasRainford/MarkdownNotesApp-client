import { User } from "../../../../generated/graphql";
import { testUsers } from "../../../../test-utils/testData";
import { Props } from "../user-details/UserDetails";

const base: Props = {
  user: testUsers[0] as User,
  isMe: true,
};

export const mockBaseTemplateProps = {
  base,
};
