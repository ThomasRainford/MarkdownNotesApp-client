import { Avatar, Box, Button, Heading, Text } from "@chakra-ui/react";
import { User } from "../../../../generated/graphql";

export interface Props {
  user: User | null;
  isMe: boolean;
}

const UserDetails = ({ user, isMe }: Props): JSX.Element => {
  console.log(user);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      w={"60%"}
      h={"100%"}
      mt={"25%"}
    >
      <Box
        display={"flex"}
        flexDir="column"
        justifyContent={"start"}
        w={"100%"}
        mb={"1.25em"}
      >
        <Avatar
          size={"2xl"}
          mb={"0.35em"}
          src={"https://avatars.dicebear.com/api/male/username.svg"}
        />
        <Heading>{user?.username}</Heading>
      </Box>
      <Box display={"flex"} justifyContent={"center"} w={"100%"} mb="0.55em">
        <Button w={"100%"}>{isMe ? "Edit Profile" : "Follow"}</Button>
      </Box>
      <Box display={"flex"} justifyContent={"start"} w={"100%"} mb="1.0em">
        <Box display={"flex"}>
          <Box mr={"2em"}>
            <Text color={"gray.400"}>
              {`${user?.following.length} following`}
            </Text>
          </Box>
          <Box>
            <Text color={"gray.400"}>
              {`${user?.followers.length} followers`}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"start"} w={"100%"}>
        <Text color={"gray.400"}>
          <a href={`mailto:${user?.email}`}>{user?.email}</a>
        </Text>
      </Box>
    </Box>
  );
};

export default UserDetails;
