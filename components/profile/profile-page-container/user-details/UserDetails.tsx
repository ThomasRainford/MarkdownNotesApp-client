import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Heading,
  IconButton,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import {
  useFollowMutation,
  User,
  useUpdateUserMutation,
} from "../../../../generated/graphql";

const EditProfile = ({
  user,
  setIsEditing,
}: {
  user: User;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) => {
  const [result, updateUser] = useUpdateUserMutation();
  const [value, setValue] = useState(user.username);
  const toast = useToast();
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      w={"60%"}
      mt={{ base: "5%", sm: "5%", md: "25%" }}
    >
      <Box
        display={"flex"}
        flexDir="column"
        justifyContent={"start"}
        alignItems={{ base: "center", sm: "center", md: "start" }}
        w={"100%"}
        mb={"1.25em"}
      >
        <Avatar
          size={"3xl"}
          mb={"0.45em"}
          src={"https://avatars.dicebear.com/api/male/username.svg"}
        />
        <Input
          placeholder="Username"
          size="lg"
          autoComplete="off"
          value={value}
          onChange={handleChange}
        />
      </Box>
      <Box display={"flex"} justifyContent={"center"}>
        <ButtonGroup justifyContent="center" size="sm">
          <IconButton
            icon={<CheckIcon />}
            colorScheme="green"
            color="gray.400"
            aria-label={"edit-profile-check"}
            isLoading={result.fetching}
            onClick={async () => {
              const result = await updateUser({
                username: value,
              });
              if (result.data?.updateUser.user) {
                toast({
                  id: "edit-profile-success",
                  title: `Profile updated`,
                  status: "success",
                  position: "top",
                  duration: 2000,
                });
              } else {
                toast({
                  id: "edit-profile-error",
                  title: `Failed to update profile`,
                  status: "error",
                  position: "top",
                  duration: 2000,
                });
              }
              router.replace(`/profile/${value}`);
              setIsEditing(false);
            }}
          />
          <IconButton
            icon={<CloseIcon />}
            aria-label={"edit-profile-close"}
            onClick={() => setIsEditing(false)}
          />
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export interface Props {
  user: User | null;
  me: User | null;
}

const UserDetails = ({ user, me }: Props): JSX.Element => {
  const [, follow] = useFollowMutation();
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();

  const isMe = me?._id === user?._id;
  const isMeFollowing = me?.following.includes(user?._id || "");

  return isEditing && user ? (
    <EditProfile user={user} setIsEditing={setIsEditing} />
  ) : (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      w={"60%"}
      mt={{ base: "5%", sm: "5%", md: "15%" }}
    >
      <Box
        display={"flex"}
        flexDir="column"
        justifyContent={"start"}
        alignItems={{ base: "center", sm: "center", md: "start" }}
        w={"100%"}
        mb={"1.25em"}
      >
        <Avatar
          size={"3xl"}
          mb={"0.45em"}
          src={"https://avatars.dicebear.com/api/male/username.svg"}
        />
        <Heading>{user?.username}</Heading>
      </Box>
      <Box display={"flex"} justifyContent={"center"} w={"100%"} mb="0.55em">
        <Button
          w={"100%"}
          onClick={async () => {
            if (isMe) {
              // Edit profile.
              setIsEditing(!isEditing);
            } else {
              // Follow user.
              const followResult = await follow({
                targetUserId: user?.id || "",
              });
              if (followResult.error) {
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
                  title: `Followed ${user?.username}`,
                  status: "success",
                  position: "top",
                  duration: 2000,
                });
              }
            }
          }}
        >
          {isMe ? "Edit Profile" : isMeFollowing ? "Unfollow" : "Follow"}
        </Button>
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
