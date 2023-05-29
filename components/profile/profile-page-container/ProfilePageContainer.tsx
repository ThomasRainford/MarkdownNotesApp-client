import { Avatar, Box, Button, Heading } from "@chakra-ui/react";
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
  return <Box>Error</Box>;
};

const Loading = () => {
  return <Box>Loading</Box>;
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
    <Box id="profile-page-container" display={"flex"} h={"100%"}>
      <Box display={"flex"} h={"100%"} w={"100%"}>
        <Box display={"flex"} justifyContent={"flex-end"} h={"100%"} w={"40%"}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            w={"60%"}
          >
            <Box
              display={"flex"}
              flexDir="column"
              justifyContent={"start"}
              w={"100%"}
            >
              <Avatar
                size={"2xl"}
                src={"https://avatars.dicebear.com/api/male/username.svg"}
              />
              <Heading>{userData?.username}</Heading>
            </Box>
            <Box display={"flex"} justifyContent={"center"} w={"100%"}>
              <Button w={"100%"}>{isMe ? "Edit Profile" : "Follow"}</Button>
            </Box>
            <Box display={"flex"} justifyContent={"start"} w={"100%"}>
              <Box display={"flex"}>
                <Box mr={"2em"}>3 Following</Box>
                <Box>3 Followers</Box>
              </Box>
            </Box>
            <Box display={"flex"} justifyContent={"start"} w={"100%"}>
              {userData?.email}
            </Box>
          </Box>
        </Box>

        <Box h={"100%"} w={"60%"}>
          user data
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePageContainer;
