import { Avatar, Box, Button, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChatPrivate, ChatRoom } from "../../../../generated/graphql";

const ChatPrivateInfo = ({ chatPrivate }: { chatPrivate: ChatPrivate }) => {
  const router = useRouter();
  const username = chatPrivate.participants[1].username;

  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      flexDir="column"
    >
      <Box mb="1em">
        <Box mb="0.5em">
          <Avatar size="2xl" name={username} />
        </Box>
        <Box display={"flex"} justifyContent="center">
          <Heading size="md">{username}</Heading>
        </Box>
      </Box>
      <Box>
        <Button
          role="link"
          onClick={() => {
            router.push(`/profile/${username}`);
          }}
        >
          Profile
        </Button>
      </Box>
    </Box>
  );
};

const ChatRoomInfo = ({ chatRoom }: { chatRoom: ChatRoom }) => {
  const router = useRouter();

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
      <Box width={"90%"}>
        {chatRoom.members.map((member) => {
          return (
            <Box
              key={member.id}
              role="link"
              display="flex"
              flexDir="row"
              borderRadius={"5px"}
              p="0.5em"
              _hover={{
                backgroundColor: "gray.600",
              }}
              onClick={() => {
                router.push(`/profile/${member.username}`);
              }}
            >
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
      paddingY="1em"
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
