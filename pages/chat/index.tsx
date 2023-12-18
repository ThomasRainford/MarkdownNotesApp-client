import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import ChatPageContainer from "../../components/chat/chat-container/ChatContainer";
import SelectedDataProvider from "../../components/helper/SelectedDataProvider";
import PrimaryLayout from "../../components/layouts/PrimaryLayout";
import NavBar from "../../components/navbar/NavBar";
import {
  useChatPrivatesQuery,
  useChatRoomsQuery,
  useMeQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import { NextPageWithLayout } from "../page";

const Chat: NextPageWithLayout = () => {
  const [meResult] = useMeQuery();
  const [chatPrivatesResult] = useChatPrivatesQuery();
  const [chatRoomsResult] = useChatRoomsQuery();

  useIsAuth(meResult);

  const hasChatPrivateData =
    !chatPrivatesResult.fetching && chatPrivatesResult.data;
  const hasChatRoomData = !chatRoomsResult.fetching && chatRoomsResult.data;

  return (
    <Box className="profile-page" h={"100%"}>
      <SelectedDataProvider>
        <NavBar user={meResult} />
        {!meResult.fetching &&
        meResult.data &&
        hasChatPrivateData &&
        hasChatRoomData ? (
          <ChatPageContainer
            chatPrivates={chatPrivatesResult}
            chatRooms={chatRoomsResult}
          />
        ) : null}
      </SelectedDataProvider>
    </Box>
  );
};

Chat.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default withUrqlClient(createUrqlClient)(Chat);
