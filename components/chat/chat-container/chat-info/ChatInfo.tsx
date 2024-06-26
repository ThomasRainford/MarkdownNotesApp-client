import {
  Avatar,
  Box,
  Button,
  Heading,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChatPrivate, ChatRoom, User } from "../../../../generated/graphql";
import { chatName } from "../../../../utils/util";

const ChatPrivateInfo = ({
  chatPrivate,
  me,
}: {
  chatPrivate: ChatPrivate;
  me: User;
}) => {
  const router = useRouter();
  const chatUserName = chatName(chatPrivate, me.id);

  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      flexDir="column"
    >
      <Box mb="1em">
        <Box mb="0.5em">
          <Avatar size="2xl" name={chatUserName} />
        </Box>
        <Box display={"flex"} justifyContent="center">
          <Heading size="md">{chatUserName}</Heading>
        </Box>
      </Box>
      <Box>
        <Button
          role="link"
          onClick={() => {
            router.push(`/profile/${chatUserName}`);
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

  const colorMode = useColorMode();
  const colorModeValue = (light: string, dark: string) => {
    return colorMode.colorMode === "light" ? light : dark;
  };

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
                backgroundColor: colorModeValue("gray.400", "gray.600"),
              }}
              onClick={() => {
                router.push(`/profile/${member.username}`);
              }}
            >
              <Box mr="0.5em">
                <Avatar name={member.username} />
              </Box>
              <Box display={"flex"} flexDir="column">
                <Box mr="0.5em">
                  <Text>{member.username}</Text>
                </Box>
                <Box>
                  <Text
                    fontSize={"sm"}
                    fontWeight="light"
                    color={colorModeValue("gray.600", "gray.300")}
                  >
                    {member.email}
                  </Text>
                </Box>
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
  me: User;
}

const Chatinfo = ({ chat, me }: Props): JSX.Element => {
  const colorMode = useColorMode();
  const colorModeValue = (light: string, dark: string) => {
    return colorMode.colorMode === "light" ? light : dark;
  };

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      h={"100%"}
      w={{ base: "100%", md: "25%" }}
      paddingY="1em"
      bg={colorModeValue("gray.200", "gray.500")}
    >
      <Box>
        {chat?.__typename === "ChatPrivate" ? (
          <ChatPrivateInfo chatPrivate={chat} me={me} />
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
