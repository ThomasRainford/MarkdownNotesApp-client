import { Avatar, Box, Button } from "@chakra-ui/react";
import { ChatPrivate, ChatRoom } from "../../../../generated/graphql";

const ChatPrivateInfo = ({ chatPrivate }: { chatPrivate: ChatPrivate }) => {
  return (
    <Box>
      <Box>
        <Avatar />
      </Box>
      <Box>{chatPrivate.participants[1].username}</Box>
      <Box>
        <Button>Profile</Button>
      </Box>
    </Box>
  );
};

const ChatRoomInfo = ({ chatRoom }: { chatRoom: ChatRoom }) => {
  return (
    <Box>
      <Box></Box>
      <Box>{chatRoom.name}</Box>
      <Box>
        {chatRoom.members.map((member) => {
          return (
            <Box key={member.id}>
              <Box>
                <Avatar />
              </Box>
              <Box display={"flex"} flexDir="row">
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
