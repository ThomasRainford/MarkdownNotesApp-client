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
import CollectionList from "./collection-list/CollectionList";
import Collections from "./collections/Collections";
import UserList from "./user-list/UserList";

export interface Props {
  meData: User;
  userData: User;
  userCollectionsData: Collection[];
  followingData: User[];
  followersData: User[];
  votesData: Collection[];
}

const UserData = ({
  meData,
  userData,
  userCollectionsData,
  followingData,
  followersData,
  votesData,
}: Props): JSX.Element => {
  const tabsIsFitted = useBreakpointValue({
    base: true,
    md: false,
  });
  const tabsAlign = useBreakpointValue({
    base: "center",
    md: "start",
  }) as "start" | "center" | "end" | undefined;

  const isMe = meData._id === userData._id;

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
              <Collections
                userCollectionsData={userCollectionsData}
                isMe={isMe}
              />
            </TabPanel>
            <TabPanel>
              <UserList type="following" users={followingData} me={meData} />
            </TabPanel>
            <TabPanel>
              <UserList type="followers" users={followersData} me={meData} />
            </TabPanel>
            <TabPanel>
              <CollectionList collections={votesData} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default UserData;
