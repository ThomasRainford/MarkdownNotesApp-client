import { Box, Spinner } from "@chakra-ui/react";
import { UseQueryState } from "urql";
import { Exact, User, UserQuery } from "../../../generated/graphql";
import UserDetails from "./user-details/UserDetails";

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
  return (
    <Box id="profile-page-container" display={"flex"} h={"calc(100% - 64px)"}>
      <Box display={"flex"} h={"100%"} w={"100%"} m="10px">
        An error has occured aquiring this users&apos; data.
      </Box>
    </Box>
  );
};

const Loading = () => {
  return (
    <Box id="profile-page-container" display={"flex"} h={"calc(100% - 64px)"}>
      <Box display={"flex"} h={"100%"} w={"100%"}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems="center"
          h={"100%"}
          w={"40%"}
        >
          <Box bg="gray.800">
            <Spinner size={"xl"} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
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
    <Box id="profile-page-container" display={"flex"} h={"calc(100% - 64px)"}>
      <Box display={"flex"} h={"100%"} w={"100%"}>
        <Box display={"flex"} justifyContent={"flex-end"} h={"100%"} w={"40%"}>
          <UserDetails user={userData as User | null} isMe={isMe} />
        </Box>
        <Box h={"100%"} w={"60%"}>
          user data
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePageContainer;
