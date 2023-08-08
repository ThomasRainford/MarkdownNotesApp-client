import { Box } from "@chakra-ui/react";
import { UseQueryState } from "urql";
import { MyNotesSmallDesktopViewPaneVisibleProvider } from "../../../contexts/MyNotesSmallDesktopViewPaneVisibleContext";
import {
  Collection,
  Exact,
  MeQuery,
  User,
  UserQuery,
  useUserCollectionsQuery,
} from "../../../generated/graphql";
import NotesContent from "../notes-content/NotesContent";

const Loading = () => {
  return <Box>Loading...</Box>;
};
const Error = () => {
  return <Box>An error has occured</Box>;
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

const NotesContainer = ({ user, me }: Props): JSX.Element => {
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
    variables: { id: userData?.id || "" },
  });
  const userCollectionsError = userCollectionsResult.error;
  const userCollectionsLoading = userCollectionsResult.fetching;
  const userCollectionsData = userCollectionsResult.data?.userCollections;

  if (meError || userError || userCollectionsError) {
    return <Error />;
  } else if (meLoading || userLoading || userCollectionsLoading) {
    return <Loading />;
  }

  const isMe = meData?.id === userData?.id;

  return (
    <MyNotesSmallDesktopViewPaneVisibleProvider>
      <NotesContent
        isMe={isMe}
        userData={userData as User}
        userCollectionsData={userCollectionsData as Collection[]}
      />
    </MyNotesSmallDesktopViewPaneVisibleProvider>
  );
};

export default NotesContainer;
