import { Box } from "@chakra-ui/react";
import ChatPageContainerLayout from "../../layouts/component-layouts/ChatPageContainerLayout";

const DesktopView = () => {
  return (
    <Box
      display={{ base: "none", sm: "none", md: "flex" }}
      h={"100%"}
      w={"100%"}
    >
      DesktopView
    </Box>
  );
};

export interface Props {}

const ChatPageContainer = (): JSX.Element => {
  return (
    <ChatPageContainerLayout>
      <DesktopView />
    </ChatPageContainerLayout>
  );
};

export default ChatPageContainer;
