import { Box } from "@chakra-ui/react";
import { ChatPrivate, ChatRoom, Message } from "../../../../generated/graphql";

export interface Props {
  chat: ChatPrivate | ChatRoom | undefined;
  messages: Message[];
}

const ChatMessages = ({ chat, messages }: Props): JSX.Element => {
  if (!chat) {
    return <Box>No chat selected</Box>;
  }

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      h={"100%"}
      w={{ base: "100%", md: "50%" }}
      padding="1em"
      bg="gray.600"
    >
      <Box mb={"2em"}>
        {chat.__typename === "ChatPrivate" ? (
          <Box>{chat.participants[1].username}</Box>
        ) : chat.__typename === "ChatRoom" ? (
          <Box>{chat.name}</Box>
        ) : (
          <></>
        )}
      </Box>
      {messages.map((message) => {
        return (
          <Box key={message.id}>
            <Box> {message.sender.username}</Box>
            <Box> {message.content}</Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default ChatMessages;
