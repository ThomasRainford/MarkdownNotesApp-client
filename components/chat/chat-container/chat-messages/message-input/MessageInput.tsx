import { Input } from "@chakra-ui/react";

export interface Props {}

const MessageInput = (): JSX.Element => {
  return (
    <Input
      type={"filled"}
      bg="gray.700"
      placeholder="Type your message here..."
      onClick={() => {}}
    />
  );
};

export default MessageInput;
