import { ArrowRightIcon } from "@chakra-ui/icons";
import { Box, ButtonGroup, IconButton, Input } from "@chakra-ui/react";
import { useState } from "react";
import {
  ChatPrivate,
  ChatRoom,
  useCreatePrivateMessageMutation,
  useCreateRoomMessageMutation,
} from "../../../../../generated/graphql";

export interface Props {
  chat: ChatPrivate | ChatRoom;
}

const MessageInput = ({ chat }: Props): JSX.Element => {
  const [inputValue, setInputValue] = useState("");
  const [, createPrivateMessage] = useCreatePrivateMessageMutation();
  const [, createRoomMessage] = useCreateRoomMessageMutation();

  const chatType = chat.__typename;
  const create =
    chatType === "ChatPrivate" ? createPrivateMessage : createRoomMessage;

  return (
    <>
      <Box flexGrow={10} mr="0.5em">
        <Input
          type={"filled"}
          bg="gray.700"
          placeholder="Type your message here..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            create({
              createMessageInput: {
                chatId: chat.id,
                content: inputValue,
              },
            });
            setInputValue("");
          }}
        />
      </Box>
      <Box display="flex" alignItems="center" flexGrow={1}>
        <ButtonGroup spacing="1">
          <IconButton
            variant={"outline"}
            icon={<ArrowRightIcon />}
            color="blue.500"
            bg={"gray.600"}
            aria-label={"send-message-button"}
            onClick={() => {
              create({
                createMessageInput: {
                  chatId: chat.id,
                  content: inputValue,
                },
              });
              setInputValue("");
            }}
          />
        </ButtonGroup>
      </Box>
    </>
  );
};

export default MessageInput;
