import { UseQueryState } from "urql";
import { Exact, UserQuery } from "../../../generated/graphql";

export interface Props {
  user: UseQueryState<
    UserQuery,
    Exact<{
      username: string;
    }>
  >;
  isMe: boolean;
}

const Error = () => {
  return <div>Error</div>;
};

const Loading = () => {
  return <div>Loading</div>;
};

const ProfilePageContainer = ({ user, isMe }: Props): JSX.Element => {
  const error = user.error;
  const loading = user.fetching;
  const userData = user.data?.user;

  if (error) {
    return <Error />;
  } else if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div>{isMe ? "You" : "Another user"}</div>
      <div>{userData?.username}</div>
    </div>
  );
};

export default ProfilePageContainer;
