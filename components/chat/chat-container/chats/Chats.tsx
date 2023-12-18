import { Box, Heading, Input } from "@chakra-ui/react";
import { ChatPrivate, ChatRoom } from "../../../../generated/graphql";

export interface Props {
  chats: (ChatPrivate | ChatRoom)[];
}

const Chats = ({ chats }: Props): JSX.Element => {
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
          return <Box key={chat.id}>{chat.participants[1].username}</Box>;
        } else if (chat.__typename === "ChatRoom") {
          return <Box key={chat.id}>{chat.name}</Box>;
        }
      })}
    </Box>
  );
};

export default Chats;
