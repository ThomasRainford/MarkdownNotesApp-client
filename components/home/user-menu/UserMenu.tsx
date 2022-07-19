import {
  Avatar,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { UseQueryState } from "urql";
import { MeQuery, useLogoutMutation } from "../../../generated/graphql";

export interface Props {
  user: UseQueryState<MeQuery, object>;
}

const UserMenu = ({ user: me }: Props): JSX.Element => {
  const username = me.data?.me?.username;

  const [, logout] = useLogoutMutation();
  const router = useRouter();
  const toast = useToast();

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar
          size={"sm"}
          src={"https://avatars.dicebear.com/api/male/username.svg"}
        />
      </MenuButton>
      <MenuList alignItems={"center"}>
        <br />
        <Center>
          <Avatar
            size={"2xl"}
            src={"https://avatars.dicebear.com/api/male/username.svg"}
          />
        </Center>
        <br />
        <Center>
          <p>{username}</p>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem>Your Profile</MenuItem>
        <MenuItem>Your Collections</MenuItem>
        <MenuItem>Account Settings</MenuItem>
        <MenuItem
          data-testid="logout-button"
          onClick={async () => {
            const result = await logout();
            if (result.data?.logout && !result.error) {
              toast({
                id: "logout",
                title: "Logout Successfull",
                status: "success",
                position: "top",
                duration: 2000,
              });
              router.push("/account/login");
            } else {
              toast({
                id: "logout",
                title: "Logout Failed",
                status: "error",
                position: "top",
                duration: 2000,
              });
            }
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
