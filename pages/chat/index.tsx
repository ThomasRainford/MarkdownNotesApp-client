import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import ChatPageContainer from "../../components/chat/chat-container/ChatContainer";
import SelectedDataProvider from "../../components/helper/SelectedDataProvider";
import PrimaryLayout from "../../components/layouts/PrimaryLayout";
import NavBar from "../../components/navbar/NavBar";
import { useMeQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import { NextPageWithLayout } from "../page";

const Chat: NextPageWithLayout = () => {
  const [meResult] = useMeQuery();

  useIsAuth(meResult);

  return (
    <Box className="profile-page" h={"100%"}>
      <SelectedDataProvider>
        <NavBar user={meResult} />
        {!meResult.fetching && meResult.data ? <ChatPageContainer /> : null}
      </SelectedDataProvider>
    </Box>
  );
};

Chat.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default withUrqlClient(createUrqlClient)(Chat);
