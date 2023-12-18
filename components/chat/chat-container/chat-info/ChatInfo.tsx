import { Box } from "@chakra-ui/react";
import { ChatPrivate, ChatRoom } from "../../../../generated/graphql";

export interface Props {
  chat: ChatPrivate | ChatRoom | undefined;
}

const Chatinfo = ({ chat }: Props): JSX.Element => {
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      h={"100%"}
      w={{ base: "100%", md: "25%" }}
      padding="1em"
      bg="gray.500"
    >
      Chat info here
    </Box>
  );
};

export default Chatinfo;
