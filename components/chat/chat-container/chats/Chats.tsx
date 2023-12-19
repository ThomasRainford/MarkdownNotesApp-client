import { Avatar, Box, Heading, Input } from "@chakra-ui/react";
import { Chat, ChatPrivate, ChatRoom } from "../../../../generated/graphql";

export interface Props {
  chats: (ChatPrivate | ChatRoom)[];
  selectedChatState: [string, (_: string) => void];
}

const Chats = ({ chats, selectedChatState }: Props): JSX.Element => {
  const [selectedChat, setSelectedChat] = selectedChatState;

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat.id);
  };

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      h={"100%"}
      w={{ base: "100%", md: "25%" }}
      padding="1em"
    >
      <Box mb="1em">
        <Heading>Chats</Heading>
      </Box>
      <Box mb="1em">
        <Input
          type="text"
          value={""}
          placeholder={"Search chats..."}
          onChange={() => {}}
          bg="gray.600"
          color="gray.500"
        />
      </Box>

      {chats.map((chat) => {
        if (chat.__typename === "ChatPrivate") {
          return (
            <Box
              key={chat.id}
              p="1em"
              border={chat.id === selectedChat ? "1px solid white" : ""}
              onClick={() => {
                handleSelectChat(chat as Chat);
              }}
            >
              <Box display={"flex"} flexDir="row" alignItems={"center"}>
                <Box mr="0.5em">
                  <Avatar name={chat.participants[1].username} />
                </Box>
                <Box>
                  <Box>{chat.participants[1].username}</Box>
                  <Box>Test message</Box>
                </Box>
              </Box>
            </Box>
          );
        } else if (chat.__typename === "ChatRoom") {
          return (
            <Box
              key={chat.id}
              p="1em"
              border={chat.id === selectedChat ? "1px solid white" : ""}
              onClick={() => {
                handleSelectChat(chat as Chat);
              }}
            >
              <Box display={"flex"} flexDir="row" alignItems={"center"}>
                <Box mr="0.5em">
                  <Avatar bg={"gray.600"} />
                </Box>
                <Box>
                  <Box>{chat.name}</Box>
                  <Box>Test message</Box>
                </Box>
              </Box>
            </Box>
          );
        }
      })}
    </Box>
  );
};

export default Chats;
