import { ArrowRightIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  ButtonGroup,
  Heading,
  IconButton,
  Input,
} from "@chakra-ui/react";
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
          <Box flexDir="column" width={"100%"}>
            <Box padding="1em">
              {messages?.map((message) => {
                return (
                  <Box key={message.id}>
                    <Box> {message.sender.username}</Box>
                    <Box> {message.content}</Box>
                  </Box>
                );
              })}
            </Box>
            <Box display="flex" m={"0.5em"}>
              <Box flexGrow={4} mr="0.5em">
                <Input
                  type={"filled"}
                  bg="gray.700"
                  placeholder="Type your message here..."
                  onClick={() => {}}
                />
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
