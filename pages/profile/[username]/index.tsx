import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import PrimaryLayout from "../../../components/layouts/PrimaryLayout";
import NavBar from "../../../components/navbar/NavBar";
import ProfilePageContainer from "../../../components/profile/profile-page-container/ProfilePageContainer";
import { useMeQuery, useUserQuery } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useIsAuth } from "../../../utils/hooks/useIsAuth";
import { NextPageWithLayout } from "../../page";

const Profile: NextPageWithLayout = () => {
  const router = useRouter();
  const { username } = router.query as { username: string };
  const [meResult] = useMeQuery();
  const [userResult] = useUserQuery({
    variables: {
      username: username || "",
    },
  });

  useIsAuth(meResult);

  const isMe = meResult.data?.me?.username === username;

  return (
    <Box className="profile-page" h={"100%"}>
      <NavBar user={meResult} />
      {!meResult.fetching && meResult.data ? (
        <ProfilePageContainer user={userResult} isMe={isMe} />
      ) : null}
    </Box>
  );
};

Profile.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default withUrqlClient(createUrqlClient)(Profile);
