import {
  Avatar,
  Button,
  Flex,
  Heading,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { User } from "../../../../../generated/graphql";
import { includesAny } from "../../../../../utils/util";

const UserButton = ({
  type,
  user,
}: {
  type: "following" | "followers";
  user: User;
}) => {
  let buttonText = "";
  if (type === "following") {
    buttonText = "Unfollow";
  } else {
    const isFollowing = includesAny<string>(user.following, user.followers);
    if (isFollowing) buttonText = "Unfollow";
    else buttonText = "Follow";
  }

  return <Button size="sm">{buttonText}</Button>;
};

export interface Props {
  type: "following" | "followers";
  users: User[];
}

const UserList = ({ type, users }: Props): JSX.Element => {
  return (
    <VStack
      divider={<StackDivider borderColor="gray.600" />}
      spacing={4}
      align="stretch"
    >
      {[...users, ...users, ...users].map((user) => {
        return (
          <Flex key={user.id} justify="space-between">
            <Flex>
              <Flex mr="2em">
                <Avatar
                  size={"md"}
                  src={"https://avatars.dicebear.com/api/male/username.svg"}
                />
              </Flex>
              <Flex flexDirection={"column"} justify="space-between">
                <Heading size={"md"} color={"gray.300"}>
                  {user.username}
                </Heading>
                <Text fontSize={"xs"} color={"gray.400"}>
                  {user.email}
                </Text>
              </Flex>
            </Flex>
            <Flex align={"center"}>
              <UserButton type={type} user={user} />
            </Flex>
          </Flex>
        );
      })}
    </VStack>
  );
};

export default UserList;
