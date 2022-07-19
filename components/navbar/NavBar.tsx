import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Spinner,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { UseQueryState } from "urql";
import { MeQuery } from "../../generated/graphql";
import UserMenu from "../home/user-menu/UserMenu";

const Links = ["My Notes"];

const NavLink = ({ children, href }: { children: ReactNode; href: string }) => (
  <NextLink href={href}>
    <Link
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {children}
    </Link>
  </NextLink>
);

export interface Props {
  user: UseQueryState<MeQuery, object>;
}

const NavBar = ({ user }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const toast = useToast();

  const loginFetching = user.fetching;
  const loggedIn = user.data?.me;

  return (
    <Box bg={useColorModeValue("gray.300", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Box>
            <Heading
              size="lg"
              onClick={() => {
                if (router.pathname !== "/") router.push("/");
              }}
            >
              MDN Notes
            </Heading>
          </Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <Button
                key={link}
                role="link"
                variant="link"
                onClick={() => {
                  if (!loggedIn) {
                    toast({
                      id: "no-access",
                      title: "Please login to access this page.",
                      status: "error",
                      position: "top",
                      duration: 2000,
                    });
                  }
                  router.push("/my-notes");
                }}
              >
                {link}
              </Button>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <Button mr="1em" onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          {loggedIn ? (
            <UserMenu user={user} />
          ) : !loginFetching ? (
            <NavLink href="account/login">
              <Button variant="outline" color="blue.300">
                Login
              </Button>
            </NavLink>
          ) : (
            <Spinner />
          )}
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link} href="">
                {link}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default NavBar;
