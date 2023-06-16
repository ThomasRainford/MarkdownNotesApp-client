import {
  Box,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Collection, User } from "../../../../generated/graphql";
import Collections from "./collections/Collections";
import UserList from "./user-list/UserList";

export interface Props {
  userData: User;
  userCollectionsData: Collection[];
  followingData: User[];
  followersData: User[];
}

const UserData = ({
  userData,
  userCollectionsData,
  followingData,
  followersData,
}: Props): JSX.Element => {
  const tabsIsFitted = useBreakpointValue({
    base: true,
    md: false,
  });
  const tabsAlign = useBreakpointValue({
    base: "center",
    md: "start",
  }) as "start" | "center" | "end" | undefined;

  return (
    <Box display={"flex"} w="100%" mt={{ base: "5%", sm: "5%", md: "17%" }}>
      <Box display={"flex"} w="100%">
        <Tabs
          isFitted={tabsIsFitted}
          align={tabsAlign}
          position="relative"
          variant="unstyled"
          w={{ base: "100%" }}
        >
          <TabList>
            <Tab>
              <Text color={"gray.300"}>Collections</Text>
            </Tab>
            <Tab>
              <Text color={"gray.300"}>Following</Text>
            </Tab>
            <Tab>
              <Text color={"gray.300"}>Followers</Text>
            </Tab>
            <Tab>
              <Text color={"gray.300"}>Votes</Text>
            </Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="blue.500"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel>
              <Collections userCollectionsData={userCollectionsData} />
            </TabPanel>
            <TabPanel>
              <UserList type="following" users={followingData} />
            </TabPanel>
            <TabPanel>
              <UserList type="followers" users={followersData} />
            </TabPanel>
            <TabPanel>
              <p>Votes {JSON.stringify(userData.upvoted)}</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default UserData;
