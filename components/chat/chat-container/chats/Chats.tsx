import { Avatar, Box, Heading, Input, Text } from "@chakra-ui/react";
import filter from "lodash/filter";
import includes from "lodash/includes";
import { ReactNode, useEffect, useState } from "react";
import {
  Chat,
  ChatPrivate,
  ChatRoom,
  User,
} from "../../../../generated/graphql";
import { chatName } from "../../../../utils/util";
import CreateChat from "./create-chat/CreateChat";

const ChatLayout = ({
  children,
  currentChat,
  selectedChat,
  onClick,
}: {
  children: ReactNode;
  currentChat: ChatPrivate | ChatRoom;
  selectedChat: string;
  onClick: () => void;
}) => {
  return (
    <Box
      key={currentChat.id}
      p="1em"
      borderRadius={"3px"}
      _hover={{
        backgroundColor: currentChat.id !== selectedChat ? "gray.500" : "",
      }}
      backgroundColor={currentChat.id === selectedChat ? "gray.600" : ""}
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </Box>
  );
};

export interface Props {
  chats: (ChatPrivate | ChatRoom)[];
  selectedChatState: [string, (_: string) => void];
  me: User;
}

const Chats = ({ chats, selectedChatState, me }: Props): JSX.Element => {
  const [selectedChat, setSelectedChat] = selectedChatState;

  const [filterText, setFilterText] = useState<string>("");
  const [displayedChats, setDisplayedChats] = useState(chats);

  useEffect(() => {
    setDisplayedChats(chats);
  }, [chats]);

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat.id);
  };

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      h={"100%"}
      w={{ base: "100%", md: "25%" }}
      padding="0.85em"
    >
      <Box mb="1em">
        <Heading>Chats</Heading>
      </Box>
      <Box mb="1em">
        <Input
          type="text"
          value={filterText}
          placeholder={"Search chats..."}
          bg="gray.600"
          onChange={(event) => {
            const value = event.target.value;
            setFilterText(value);
            const items = chats.map((chat) =>
              chat.__typename === "ChatPrivate"
                ? chat.participants[1].username.toLowerCase()
                : chat.__typename === "ChatRoom"
                ? chat.name.toLowerCase()
                : ""
            );
            const filteredItems = filter(items, (item) =>
              includes(item, value.toLowerCase())
            );
            setDisplayedChats(
              chats.filter((chat) =>
                filteredItems.includes(
                  chat.__typename === "ChatPrivate"
                    ? chat.participants[1].username.toLowerCase()
                    : chat.__typename === "ChatRoom"
                    ? chat.name.toLowerCase()
                    : ""
                )
              )
            );
          }}
        />
      </Box>
      <Box>
        {displayedChats.map((chat) => {
          if (chat.__typename === "ChatPrivate") {
            const lastMessage =
              chat.messages.length > 0
                ? chat.messages[chat.messages.length - 1]
                : null;
            const senderUsername = lastMessage?.sender.username;
            const messageContent = lastMessage?.content.slice(0, 20) + "...";
            const chatUserName = chatName(chat, me.id);
            return (
              <ChatLayout
                key={chat.id}
                currentChat={chat}
                selectedChat={selectedChat}
                onClick={() => handleSelectChat(chat as Chat)}
              >
                <Box display={"flex"} flexDir="row" alignItems={"center"}>
                  <Box mr="0.5em">
                    <Avatar name={chatUserName} />
                  </Box>
                  <Box>
                    <Box>
                      <Heading size="sm">{chatUserName}</Heading>
                    </Box>
                    <Box>
                      <Text fontSize={"sm"} color="gray.400">
                        {!lastMessage
                          ? "No messages yet..."
                          : `${senderUsername}: ${messageContent}`}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </ChatLayout>
            );
          } else if (chat.__typename === "ChatRoom") {
            const lastMessage = chat.messages[chat.messages.length - 1];
            const senderUsername = lastMessage.sender.username;
            const messageContent = lastMessage.content.slice(0, 20);
            return (
              <ChatLayout
                key={chat.id}
                currentChat={chat}
                selectedChat={selectedChat}
                onClick={() => handleSelectChat(chat as Chat)}
              >
                <Box display={"flex"} flexDir="row" alignItems={"center"}>
                  <Box mr="0.5em">
                    <Avatar name={chat.name} bg={"gray.600"} />
                  </Box>
                  <Box>
                    <Box>
                      <Heading size="sm">{chat.name}</Heading>
                    </Box>
                    <Box>
                      <Text fontSize={"sm"} color="gray.400">
                        {`${senderUsername}: ${messageContent}`}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </ChatLayout>
            );
          }
        })}
      </Box>
      <Box mt="1.5em">
        <CreateChat chats={chats} />
      </Box>
    </Box>
  );
};

export default Chats;
