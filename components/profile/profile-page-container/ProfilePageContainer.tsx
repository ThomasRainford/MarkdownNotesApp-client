import { Box, Spinner } from "@chakra-ui/react";
import { UseQueryState } from "urql";
import {
  Collection,
  Exact,
  MeQuery,
  User,
  UserQuery,
  useUserCollectionsQuery,
  useUserFollowersQuery,
  useUserFollowingQuery,
} from "../../../generated/graphql";
import ProfilePageContainerLayout from "../../layouts/component-layouts/ProfilePageContainerLayout";
import UserData from "./user-data/UserData";
import UserDetails from "./user-details/UserDetails";

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
  meData,
  userData,
  userCollectionsData,
  followingData,
  followersData,
}: {
  meData: User;
  userData: User;
  userCollectionsData: Collection[];
  followingData: User[];
  followersData: User[];
}) => {
  return (
    <Box
      display={{ base: "flex", sm: "flex", md: "none" }}
      flexDir={"column"}
      h={"100%"}
      w={"100%"}
    >
      <Box display={"flex"} justifyContent={"center"} h={"100%"} w={"100%"}>
        <UserDetails me={meData} user={userData} />
      </Box>
      <Box h={"100%"} w={"100%"}>
        <UserData
          meData={meData}
          userData={userData}
          userCollectionsData={userCollectionsData}
          followingData={followingData}
          followersData={followersData}
        />
      </Box>
    </Box>
  );
};

const DesktopView = ({
  meData,
  userData,
  userCollectionsData,
  followingData,
  followersData,
}: {
  meData: User;
  userData: User;
  userCollectionsData: Collection[];
  followingData: User[];
  followersData: User[];
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
        <UserDetails me={meData} user={userData} />
      </Box>
      <Box h={"100%"} w={{ base: "100%", md: "60%" }}>
        <UserData
          meData={meData}
          userData={userData}
          userCollectionsData={userCollectionsData}
          followingData={followingData}
          followersData={followersData}
        />
      </Box>
    </Box>
  );
};

export interface Props {
  user: UseQueryState<
    UserQuery,
    Exact<{
      username: string;
    }>
  >;
  me: UseQueryState<
    MeQuery,
    Exact<{
      [key: string]: never;
    }>
  >;
}

const ProfilePageContainer = ({ user, me }: Props): JSX.Element => {
  // Current authenticated user
  const meError = me.error;
  const meLoading = me.fetching;
  const meData = me.data?.me;
  // Current user's profile
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
  const [followingResult] = useUserFollowingQuery({
    variables: { userId: user.data?.user?._id || "" },
  });
  const followingError = followingResult.error;
  const followingLoading = followingResult.fetching;
  const followingData = followingResult.data?.userFollowing;
  // Fetch users' followers.
  const [followersResult] = useUserFollowersQuery({
    variables: { userId: user.data?.user?._id || "" },
  });
  const followersError = followersResult.error;
  const followersLoading = followersResult.fetching;
  const followersData = followersResult.data?.userFollowers;

  if (
    meError ||
    userError ||
    userCollectionsError ||
    followingError ||
    followersError
  ) {
    return <Error />;
  } else if (
    meLoading ||
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
        meData={meData as User}
        userData={userData as User}
        userCollectionsData={userCollectionsData as Collection[]}
        followingData={followingData as User[]}
        followersData={followersData as User[]}
      />
      <DesktopView
        meData={meData as User}
        userData={userData as User}
        userCollectionsData={userCollectionsData as Collection[]}
        followingData={followingData as User[]}
        followersData={followersData as User[]}
      />
    </ProfilePageContainerLayout>
  );
};

export default ProfilePageContainer;
