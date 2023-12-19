import { Avatar, Box } from "@chakra-ui/react";
import { ChatPrivate, ChatRoom } from "../../../../generated/graphql";

export interface Props {
  chat: ChatPrivate | ChatRoom | undefined;
}

const ChatMessages = ({ chat }: Props): JSX.Element => {
  if (!chat) {
    return <Box>No chat selected</Box>;
  }

  const messages = chat.messages.reverse();

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
          <Box display={"flex"} flexDir="row">
            <Box mr="1em">
              <Avatar name={chat.participants[1].username} />
            </Box>
            <Box display={"flex"} alignItems="center">
              {chat.participants[1].username}
            </Box>
          </Box>
        ) : chat.__typename === "ChatRoom" ? (
          <Box>{chat.name}</Box>
        ) : (
          <></>
        )}
      </Box>
      <Box>
        {messages.map((message) => {
          return (
            <Box key={message.id}>
              <Box> {message.sender.username}</Box>
              <Box> {message.content}</Box>
            </Box>
          );
        })}
      </Box>
      <Box></Box>
    </Box>
  );
};

export default ChatMessages;
