import {
  Avatar,
  Button,
  Flex,
  Heading,
  Link,
  StackDivider,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { OperationContext, OperationResult } from "urql";
import {
  Exact,
  FollowMutation,
  useFollowMutation,
  User,
} from "../../../../../generated/graphql";

const UserButton = ({
  type,
  user,
  me,
  follow,
}: {
  type: "following" | "followers";
  user: User;
  me: User;
  follow: (
    _: Exact<{
      targetUserId: string;
    }>,
    __?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      FollowMutation,
      Exact<{
        targetUserId: string;
      }>
    >
  >;
}) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  let buttonText = "";
  if (type === "following") {
    buttonText = "Unfollow";
  } else {
    const isFollowing = me.following.includes(user.id);
    if (isFollowing) buttonText = "Unfollow";
    else buttonText = "Follow";
  }

  return (
    <Button
      size="sm"
      isLoading={loading}
      onClick={async () => {
        setLoading(true);
        const followResult = await follow({
          targetUserId: user?.id || "",
        });
        setLoading(false);
        if (followResult.error || followResult.data?.follow === null) {
          toast({
            id: "follow-error",
            title: `Failed to follow ${user?.username}`,
            status: "error",
            position: "top",
            duration: 2000,
          });
        }
        if (followResult.data?.follow !== null) {
          toast({
            id: "follow-success",
            title: `${followResult.data?.follow ? "Followed" : "Unfollowed"} ${
              user?.username
            }`,
            status: "success",
            position: "top",
            duration: 2000,
          });
        }
      }}
    >
      {buttonText}
    </Button>
  );
};

export interface Props {
  type: "following" | "followers";
  users: User[];
  me: User;
}

const UserList = ({ type, users, me }: Props): JSX.Element => {
  const [, follow] = useFollowMutation();

  return (
    <VStack
      divider={<StackDivider borderColor="gray.600" />}
      spacing={4}
      align="stretch"
    >
      {users.map((user) => {
        const isMe = user.id === me.id;
        return (
          <Flex key={user.id} justify="space-between">
            <Flex>
              <Flex mr="2em">
                <Avatar
                  size={"md"}
                  src={"https://avatars.dicebear.com/api/male/username.svg"}
                />
              </Flex>
              <Flex flexDirection={"column"} align="start">
                <Link as={NextLink} href={`/profile/${user.username}`}>
                  <Heading
                    size={"md"}
                    color={"gray.300"}
                    _hover={{
                      color: "blue.400",
                      textDecoration: "underline",
                    }}
                  >
                    {user.username}
                  </Heading>
                </Link>
                <Text fontSize={"xs"} color={"gray.400"}>
                  {user.email}
                </Text>
              </Flex>
            </Flex>
            {!isMe && (
              <Flex align={"center"}>
                <UserButton type={type} user={user} me={me} follow={follow} />
              </Flex>
            )}
          </Flex>
        );
      })}
    </VStack>
  );
};

export default UserList;
