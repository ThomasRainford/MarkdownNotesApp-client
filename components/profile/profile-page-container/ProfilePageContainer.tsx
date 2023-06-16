import { Box, Spinner } from "@chakra-ui/react";
import { UseQueryState } from "urql";
import {
  Collection,
  Exact,
  useFollowersQuery,
  useFollowingQuery,
  User,
  UserQuery,
  useUserCollectionsQuery,
} from "../../../generated/graphql";
import ProfilePageContainerLayout from "../../layouts/component-layouts/ProfilePageContainerLayout";
import UserData from "./user-data/UserData";
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

const MobileView = ({
  userData,
  userCollectionsData,
  followingData,
  followersData,
  isMe,
}: {
  userData: User;
  userCollectionsData: Collection[];
  followingData: User[];
  followersData: User[];
  isMe: boolean;
}) => {
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
        <UserData
          userData={userData}
          userCollectionsData={userCollectionsData}
          followingData={followingData}
          followersData={followersData}
          isMe={isMe}
        />
      </Box>
    </Box>
  );
};

const DesktopView = ({
  userData,
  userCollectionsData,
  followingData,
  followersData,
  isMe,
}: {
  userData: User;
  userCollectionsData: Collection[];
  followingData: User[];
  followersData: User[];
  isMe: boolean;
}) => {
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
        mr={"0.5em"}
      >
        <UserDetails user={userData as User | null} isMe={isMe} />
      </Box>
      <Box h={"100%"} w={{ base: "100%", md: "60%" }}>
        <UserData
          userData={userData}
          userCollectionsData={userCollectionsData}
          followingData={followingData}
          followersData={followersData}
          isMe={isMe}
        />
      </Box>
    </Box>
  );
};

const ProfilePageContainer = ({ user, isMe }: Props): JSX.Element => {
  const userError = user.error;
  const userLoading = user.fetching;
  const userData = user.data?.user;
  // Fetch user collections.
  const [userCollectionsResult] = useUserCollectionsQuery({
    variables: { id: userData?._id || "" },
  });
  const userCollectionsError = userCollectionsResult.error;
  const userCollectionsLoading = userCollectionsResult.fetching;
  const userCollectionsData = userCollectionsResult.data?.userCollections;
  // Fetch users' following.
  const [followingResult] = useFollowingQuery();
  const followingError = followingResult.error;
  const followingLoading = followingResult.fetching;
  const followingData = followingResult.data?.following;
  // Fetch users' followers.
  const [followersResult] = useFollowersQuery();
  const followersError = followersResult.error;
  const followersLoading = followersResult.fetching;
  const followersData = followersResult.data?.followers;

  if (userError || userCollectionsError || followingError || followersError) {
    return <Error />;
  } else if (
    userLoading ||
    userCollectionsLoading ||
    followingLoading ||
    followersLoading
  ) {
    return <Loading />;
  }

  return (
    <ProfilePageContainerLayout>
      <MobileView
        userData={userData as User}
        userCollectionsData={userCollectionsData as Collection[]}
        followingData={followingData as User[]}
        followersData={followersData as User[]}
        isMe={isMe}
      />
      <DesktopView
        userData={userData as User}
        userCollectionsData={userCollectionsData as Collection[]}
        followingData={followingData as User[]}
        followersData={followersData as User[]}
        isMe={isMe}
      />
    </ProfilePageContainerLayout>
  );
};

export default ProfilePageContainer;
