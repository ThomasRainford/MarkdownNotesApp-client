import { Avatar, Box, Button, Heading } from "@chakra-ui/react";
import { ChatPrivate, ChatRoom } from "../../../../generated/graphql";

const ChatPrivateInfo = ({ chatPrivate }: { chatPrivate: ChatPrivate }) => {
  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      flexDir="column"
    >
      <Box mb="1em">
        <Box mb="0.5em">
          <Avatar size="2xl" name={chatPrivate.participants[1].username} />
        </Box>
        <Box display={"flex"} justifyContent="center">
          <Heading size="md">{chatPrivate.participants[1].username}</Heading>
        </Box>
      </Box>
      <Box>
        <Button>Profile</Button>
      </Box>
    </Box>
  );
};

const ChatRoomInfo = ({ chatRoom }: { chatRoom: ChatRoom }) => {
  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      flexDir="column"
    >
      <Box>
        <Box mb="0.5em">
          <Avatar size="2xl" bg={"gray.600"} name={chatRoom.name} />
        </Box>
        <Box mb="1.5em">
          <Heading size={"md"}>{chatRoom.name}</Heading>
        </Box>
      </Box>

      <Box>
        {chatRoom.members.map((member) => {
          return (
            <Box key={member.id} display="flex" flexDir="row" mb="1em">
              <Box mr="0.5em">
                <Avatar name={member.username} />
              </Box>
              <Box display={"flex"} flexDir="column">
                <Box mr="0.5em">{member.username}</Box>
                <Box>{member.email}</Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export interface Props {
  chat: ChatPrivate | ChatRoom | undefined;
}

const Chatinfo = ({ chat }: Props): JSX.Element => {
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      h={"100%"}
      w={{ base: "100%", md: "25%" }}
      padding="1em"
      bg="gray.500"
    >
      <Box>
        {chat?.__typename === "ChatPrivate" ? (
          <ChatPrivateInfo chatPrivate={chat} />
        ) : chat?.__typename === "ChatRoom" ? (
          <ChatRoomInfo chatRoom={chat} />
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default Chatinfo;
