import { Avatar, Box, Heading } from "@chakra-ui/react";
import {
  ChatPrivate,
  ChatRoom,
  Message,
  useChatMessagesQuery,
  useMessageSentSubscription,
  User,
} from "../../../../generated/graphql";
import { chatName } from "../../../../utils/util";
import MessageInput from "./message-input/MessageInput";
import Messages from "./messages/Messages";

const ChatMessageHeader = ({
  chat,
  me,
}: {
  chat: ChatPrivate | ChatRoom;
  colour?: string;
  me: User;
}) => {
  const chatUserName = chatName(chat, me.id);

  const colour = chat.__typename === "ChatRoom" && "gray.700";

  return (
    <Box display={"flex"} flexDir="row">
      <Box mr="1em">
        {colour ? (
          <Avatar name={chatUserName} bg={colour} />
        ) : (
          <Avatar name={chatUserName} />
        )}
      </Box>
      <Box display={"flex"} alignItems="center">
        <Heading size={"md"}>{chatUserName}</Heading>
      </Box>
    </Box>
  );
};

export interface Props {
  chat: ChatPrivate | ChatRoom | undefined;
  me: User;
}

const ChatMessages = ({ chat, me }: Props): JSX.Element => {
  const [chatMessages] = useChatMessagesQuery({
    variables: {
      chatId: chat?.id || "",
    },
  });

  console.log("chat messages");
  const [result] = useMessageSentSubscription(
    {
      variables: {
        messageSentInput: {
          chatId: chat?.id || "",
          userId: me.id,
        },
      },
    },
    (_: Message[] | undefined, response) => {
      return [
        ...(chatMessages.data?.chatMessages || []),
        response.messageSent.message,
      ] as Message[];
    }
  );

  const messages = () => {
    const currentMessages = (chatMessages.data?.chatMessages ||
      []) as Message[];
    const concatMessages = (result.data || []) as Message[];

    if (
      concatMessages &&
      concatMessages.length > 0 &&
      concatMessages[0].chat.id === currentMessages[0].chat.id
    ) {
      return concatMessages;
    } else {
      return currentMessages;
    }
  };

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      w={{ base: "100%", md: "50%" }}
      bg="gray.600"
      className="chatmessages-container"
      h="calc(100vh - 64px)"
    >
      {!chat ? (
        <></>
      ) : (
        <Box
          display={"flex"}
          h="calc(100vh - 64px)"
          justifyContent="space-between"
          flexDir="column"
        >
          <Box mb={"2em"} padding="1em">
            <ChatMessageHeader chat={chat} me={me} />
          </Box>
          <Box display={"flex"} flexDir="column" h="calc(100vh - 180px)">
            <Box className="messages-container" h="calc(100vh - 280px)">
              <Messages messages={messages()} me={me} />
            </Box>
            <Box display="flex" m={"0.5em"}>
              <MessageInput chat={chat} />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatMessages;
