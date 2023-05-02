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
import { AnyVariables, UseQueryState } from "urql";
import { MeQuery, useLogoutMutation } from "../../../generated/graphql";
import { useAllLocalStorageValues } from "../../../utils/hooks/useAllLocalStorageValues";

export interface Props {
  user: UseQueryState<MeQuery, AnyVariables>;
}

const UserMenu = ({ user: me }: Props): JSX.Element => {
  const [, logout] = useLogoutMutation();
  const {
    selectedCollection: { setSelectedCollection },
    selectedNotesList: { setSelectedList },
    selectedNote: { setSelectedNote },
  } = useAllLocalStorageValues();
  const router = useRouter();
  const toast = useToast();
  const username = me.data?.me?.username;

  return (
    <Menu id="navbar-usermenu">
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
          <p id="home-user-menu-username">{username}</p>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem>Your Profile</MenuItem>
        <MenuItem>Your Collections</MenuItem>
        <MenuItem>Account Settings</MenuItem>
        <MenuItem
          data-testid="logout-button"
          onClick={async () => {
            const result = await logout({});
            if (result.data?.logout && !result.error) {
              setSelectedCollection("");
              setSelectedList("");
              setSelectedNote("");
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
