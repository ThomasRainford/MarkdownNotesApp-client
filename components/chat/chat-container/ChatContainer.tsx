import { Box, Spinner } from "@chakra-ui/react";
import { UseQueryState } from "urql";
import {
  ChatPrivate,
  ChatPrivatesQuery,
  ChatRoom,
  ChatRoomsQuery,
  Exact,
} from "../../../generated/graphql";
import useLocalStorage from "../../../utils/hooks/useLocalStorage";
import ChatPageContainerLayout from "../../layouts/component-layouts/ChatPageContainerLayout";
import Chatinfo from "./chat-info/ChatInfo";
import ChatMessages from "./chat-messages/ChatMessages";
import Chats from "./chats/Chats";

const Error = () => {
  return (
    <ChatPageContainerLayout>
      <Box display={"flex"} h={"100%"} w={"100%"} m="10px">
        An error has occured aquiring this users&apos; data.
      </Box>
    </ChatPageContainerLayout>
  );
};

const Loading = () => {
  return (
    <ChatPageContainerLayout>
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
    </ChatPageContainerLayout>
  );
};

const DesktopView = ({
  chatPrivates,
  chatRooms,
}: {
  chatPrivates: ChatPrivate[];
  chatRooms: ChatRoom[];
}) => {
  const selectedChatState = useLocalStorage("selectedChat", null);
  const [selectedChat] = selectedChatState;
  const allChats = [...chatPrivates, ...chatRooms];
  const selectedChatData = allChats.find((chat) => chat.id === selectedChat);

  return (
    <Box
      display={{ base: "none", sm: "none", md: "flex" }}
      h={"100%"}
      w={"100%"}
    >
      <Chats chats={allChats} selectedChatState={selectedChatState} />
      <ChatMessages chat={selectedChatData} />
      <Chatinfo chat={selectedChatData} />
    </Box>
  );
};

export interface Props {
  chatPrivates: UseQueryState<
    ChatPrivatesQuery,
    Exact<{
      [key: string]: never;
    }>
  >;
  chatRooms: UseQueryState<
    ChatRoomsQuery,
    Exact<{
      [key: string]: never;
    }>
  >;
}

const ChatPageContainer = ({ chatPrivates, chatRooms }: Props): JSX.Element => {
  const chatPrivatesError = chatPrivates.error;
  const chatPrivatesLoading = chatPrivates.fetching;
  const chatPrivatesData = chatPrivates.data?.chatPrivates;
  const chatRoomsError = chatRooms.error;
  const chatRoomsLoading = chatRooms.fetching;
  const chatRoomsData = chatRooms.data?.chatRooms;

  if (chatPrivatesError || chatRoomsError) {
    return <Error />;
  } else if (chatPrivatesLoading || chatRoomsLoading) {
    return <Loading />;
  }

  return (
    <ChatPageContainerLayout>
      <DesktopView
        chatPrivates={(chatPrivatesData as ChatPrivate[]).map((chat) => ({
          ...chat,
          __typename: "ChatPrivate",
        }))}
        chatRooms={(chatRoomsData as ChatRoom[]).map((chat) => ({
          ...chat,
          __typename: "ChatRoom",
        }))}
      />
    </ChatPageContainerLayout>
  );
};

export default ChatPageContainer;
