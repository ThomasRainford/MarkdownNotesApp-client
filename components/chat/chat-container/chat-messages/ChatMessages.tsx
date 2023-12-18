import { Box } from "@chakra-ui/react";
import { Message } from "../../../../generated/graphql";

export interface Props {
  messages: Message[];
}

const ChatMessages = ({ messages }: Props): JSX.Element => {
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      h={"100%"}
      w={{ base: "100%", md: "50%" }}
      padding="1em"
      bg="gray.600"
    >
      Chat messages here
    </Box>
  );
};

export default ChatMessages;
