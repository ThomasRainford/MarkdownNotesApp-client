import { ArrowRightIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  ButtonGroup,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  ChatPrivate,
  ChatRoom,
  Message,
  useMessageSentSubscription,
  User,
} from "../../../../generated/graphql";
import MessageInput from "./message-input/MessageInput";
import Messages from "./messages/Messages";

const ChatMessageHeader = ({
  name,
  colour,
}: {
  name: string;
  colour?: string;
}) => {
  return (
    <Box display={"flex"} flexDir="row">
      <Box mr="1em">
        {colour ? <Avatar name={name} bg={colour} /> : <Avatar name={name} />}
      </Box>
      <Box display={"flex"} alignItems="center">
        <Heading size={"md"}>{name}</Heading>
      </Box>
    </Box>
  );
};

export interface Props {
  chat: ChatPrivate | ChatRoom | undefined;
  me: User;
}

const ChatMessages = ({ chat, me }: Props): JSX.Element => {
  const [messages, setMessages] = useState(chat?.messages.reverse() || []);

  const [result] = useMessageSentSubscription({
    variables: {
      messageSentInput: {
        chatId: chat?.id || "",
        userId: me.id,
      },
    },
  });

  useEffect(() => {
    setMessages((messages) => [
      ...messages,
      result.data?.messageSent.message as Message,
    ]);
  }, [result.data?.messageSent.message]);

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      h={"100%"}
      w={{ base: "100%", md: "50%" }}
      bg="gray.600"
      height={"100%"}
    >
      {!chat ? (
        <></>
      ) : (
        <Box
          display={"flex"}
          justifyContent="space-between"
          flexDir="column"
          height={"100%"}
        >
          <Box mb={"2em"} padding="1em">
            {chat.__typename === "ChatPrivate" ? (
              <ChatMessageHeader name={chat.participants[1].username} />
            ) : chat.__typename === "ChatRoom" ? (
              <ChatMessageHeader name={chat.name} colour="gray.700" />
            ) : (
              <></>
            )}
          </Box>
          <Box>
            <Box>
              <Messages messages={messages || []} me={me} />
            </Box>
            <Box display="flex" m={"0.5em"}>
              <Box flexGrow={10} mr="0.5em">
                <MessageInput />
              </Box>
              <Box display="flex" alignItems="center" flexGrow={1}>
                <ButtonGroup spacing="1">
                  <IconButton
                    variant={"outline"}
                    icon={<ArrowRightIcon />}
                    color="blue.500"
                    bg={"gray.600"}
                    aria-label={"send-message-button"}
                  />
                </ButtonGroup>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatMessages;
