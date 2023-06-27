import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import SelectedDataProvider from "../../../components/helper/SelectedDataProvider";
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

  return (
    <Box className="profile-page" h={"100%"}>
      <SelectedDataProvider>
        <NavBar user={meResult} />
        {!meResult.fetching && meResult.data ? (
          <ProfilePageContainer user={userResult} me={meResult} />
        ) : null}
      </SelectedDataProvider>
    </Box>
  );
};

Profile.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default withUrqlClient(createUrqlClient)(Profile);
