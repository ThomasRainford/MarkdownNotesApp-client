import { Box, Spinner } from "@chakra-ui/react";
import { UseQueryState } from "urql";
import { Exact, User, UserQuery } from "../../../generated/graphql";
import ProfilePageContainerLayout from "../../layouts/component-layouts/ProfilePageContainerLayout";
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
    <ProfilePageContainerLayout>
      <Box display={"flex"} h={"100%"} w={"100%"} m="10px">
        An error has occured aquiring this users&apos; data.
      </Box>
    </ProfilePageContainerLayout>
  );
};

const Loading = () => {
  return (
    <ProfilePageContainerLayout>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems="center"
        h={"100%"}
        w={{ base: "100%", md: "40%" }}
      >
        <Box bg="gray.800">
          <Spinner size={"xl"} />
        </Box>
      </Box>
    </ProfilePageContainerLayout>
  );
};

const MobileView = ({ userData, isMe }: { userData: User; isMe: boolean }) => {
  return (
    <Box
      display={{ base: "flex", sm: "flex", md: "none" }}
      flexDir={"column"}
      h={"100%"}
      w={"100%"}
    >
      <Box display={"flex"} justifyContent={"center"} h={"100%"} w={"100%"}>
        <UserDetails user={userData as User | null} isMe={isMe} />
      </Box>
      <Box h={"100%"} w={"100%"}>
        user data
      </Box>
    </Box>
  );
};

const DesktopView = ({ userData, isMe }: { userData: User; isMe: boolean }) => {
  return (
    <Box
      display={{ base: "none", sm: "none", md: "flex" }}
      h={"100%"}
      w={"100%"}
    >
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        h={"100%"}
        w={{ base: "100%", md: "40%" }}
      >
        <UserDetails user={userData as User | null} isMe={isMe} />
      </Box>
      <Box h={"100%"} w={{ base: "100%", md: "60%" }}>
        user data
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
    <ProfilePageContainerLayout>
      <MobileView userData={userData as User} isMe={isMe} />
      <DesktopView userData={userData as User} isMe={isMe} />
    </ProfilePageContainerLayout>
  );
};

export default ProfilePageContainer;
