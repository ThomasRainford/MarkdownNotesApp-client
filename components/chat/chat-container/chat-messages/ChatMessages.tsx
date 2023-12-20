import { Avatar, Box, Heading } from "@chakra-ui/react";
import { ChatPrivate, ChatRoom } from "../../../../generated/graphql";

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
}

const ChatMessages = ({ chat }: Props): JSX.Element => {
  const messages = chat?.messages.reverse();

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      h={"100%"}
      w={{ base: "100%", md: "50%" }}
      padding="1em"
      bg="gray.600"
    >
      {!chat ? (
        <></>
      ) : (
        <Box>
          <Box mb={"2em"}>
            {chat.__typename === "ChatPrivate" ? (
              <ChatMessageHeader name={chat.participants[1].username} />
            ) : chat.__typename === "ChatRoom" ? (
              <ChatMessageHeader name={chat.name} colour="gray.700" />
            ) : (
              <></>
            )}
          </Box>
          <Box>
            {messages?.map((message) => {
              return (
                <Box key={message.id}>
                  <Box> {message.sender.username}</Box>
                  <Box> {message.content}</Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatMessages;
