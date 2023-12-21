import { Avatar, Box, Text } from "@chakra-ui/react";
import { Fragment } from "react";
import { Message, User } from "../../../../../generated/graphql";

const MeMessageBubble = ({
  content,
  date,
}: {
  content: string;
  date?: string;
}) => {
  return (
    <>
      {date && (
        <Box display={"flex"} justifyContent="center" mb="1em">
          <Text fontSize={"xs"} color={"gray.400"}>
            {date}
          </Text>
        </Box>
      )}
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Box mb="0.25em">
          <Box bg={"blue.600"} p="0.5em" borderRadius={"6px"}>
            {content}
          </Box>
        </Box>
        <Box
          display="flex"
          flexDir={"column"}
          justifyContent={"flex-end"}
          ml="0.5em"
        >
          <Box mr="2em" />
        </Box>
      </Box>
    </>
  );
};

const MeMessage = ({ message, date }: { message: Message; date?: string }) => {
  return (
    <>
      {date && (
        <Box display={"flex"} justifyContent="center" mb="1em">
          <Text fontSize={"xs"} color={"gray.400"}>
            {date}
          </Text>
        </Box>
      )}
      <Box display={"flex"} justifyContent={"flex-end"} mb="1em">
        <Box>
          <Box bg={"blue.600"} p="0.5em" borderRadius={"6px"}>
            {message.content}
          </Box>
          <Box float="left" ml="0.25em">
            <Text color="gray.400" fontSize="sm">
              {message.sender.username}
            </Text>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDir={"column"}
          justifyContent={"flex-end"}
          ml="0.5em"
        >
          <Box mb="0.25em">
            <Avatar size="sm" name={message.sender.username} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

const UserMessageBubble = ({
  content,
  date,
}: {
  content: string;
  date?: string;
}) => {
  return (
    <>
      {date && (
        <Box display={"flex"} justifyContent="center" mb="1em">
          <Text fontSize={"xs"} color={"gray.400"}>
            {date}
          </Text>
        </Box>
      )}
      <Box display={"flex"} justifyContent={"flex-start"}>
        <Box
          display="flex"
          flexDir={"column"}
          justifyContent={"flex-end"}
          mr="0.5em"
        >
          <Box mr="2em" />
        </Box>
        <Box mb="0.25em">
          <Box bg={"gray.500"} p="0.5em" borderRadius={"6px"}>
            {content}
          </Box>
        </Box>
      </Box>
    </>
  );
};

const UserMessage = ({
  message,
  date,
}: {
  message: Message;
  date?: string;
}) => {
  return (
    <>
      {date && (
        <Box display={"flex"} justifyContent="center" mb="1em">
          <Text fontSize={"xs"} color={"gray.400"}>
            {date}
          </Text>
        </Box>
      )}
      <Box display={"flex"} justifyContent={"flex-start"} mb="1em">
        <Box
          display="flex"
          flexDir={"column"}
          justifyContent={"flex-end"}
          mr="0.5em"
        >
          <Box>
            <Avatar size="sm" name={message.sender.username} />
          </Box>
        </Box>
        <Box>
          <Box bg={"gray.500"} p="0.5em" borderRadius={"6px"}>
            {message.content}
          </Box>
          <Box float={"right"}>
            <Text mr="0.25em" color="gray.400" fontSize="sm">
              {message.sender.username}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export interface Props {
  messages: Message[];
  me: User;
}

const Messages = ({ messages, me }: Props): JSX.Element => {
  return (
    <Box padding="1em">
      {messages?.map((message, i) => {
        const isMe = message.sender.id === me.id;
        const date = new Date(message.createdAt).toLocaleString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        });
        const nextMessage = i === messages.length - 1 ? null : messages[i + 1];
        const nextSameUser = nextMessage?.sender.id === message.sender.id;
        const prevMessage = i === 0 ? null : messages[i - 1];
        const prevSameUser = prevMessage?.sender.id === message.sender.id;
        const isFirstInSeries =
          i === 0 ||
          (!prevSameUser && nextSameUser) ||
          (!prevSameUser && !nextSameUser);

        return (
          <Fragment key={message.id}>
            {isMe ? (
              nextSameUser ? (
                <MeMessageBubble
                  content={message.content}
                  date={isFirstInSeries ? date : undefined}
                />
              ) : (
                <MeMessage
                  message={message}
                  date={isFirstInSeries ? date : undefined}
                />
              )
            ) : nextSameUser ? (
              <UserMessageBubble
                content={message.content}
                date={isFirstInSeries ? date : undefined}
              />
            ) : (
              <UserMessage
                message={message}
                date={isFirstInSeries ? date : undefined}
              />
            )}
          </Fragment>
        );
      })}
    </Box>
  );
};

export default Messages;
