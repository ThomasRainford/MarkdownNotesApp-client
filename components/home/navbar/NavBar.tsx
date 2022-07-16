import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactNode } from "react";
import { useMeQuery } from "../../../generated/graphql";
import UserMenu from "../user-menu/UserMenu";

const Links = ["My Collections"];

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

export interface Props {}

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const [meResult] = useMeQuery();

  const loggedIn = !meResult.fetching && meResult.data?.me;

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
            <Heading size="lg">MDN Notes</Heading>
          </Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link} href="">
                <Button role="link" variant="link">
                  {link}
                </Button>
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <Button mr="1em" onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          {loggedIn ? (
            <UserMenu me={meResult} />
          ) : (
            <NavLink href="account/login">
              <Button variant="outline" color="blue.300">
                Login
              </Button>
            </NavLink>
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
