import { Avatar, Box, Button, Text, useToast } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { h } from "hastscript";
import { Child } from "hastscript/lib/create-h";
import { Fragment, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import {
  Message,
  User,
  useSavePublicCollectionMutation,
} from "../../../../../generated/graphql";
import { markdownTheme } from "./utils";

const MessageContent = ({ content }: { content: string }) => {
  const [savePublicCollectionResult, savePublicCollection] =
    useSavePublicCollectionMutation();
  const toast = useToast();

  // remark plugin to add a custom tag to the AST
  function htmlDirectives() {
    return transform;

    function transform(tree: any) {
      visit(
        tree,
        ["textDirective", "leafDirective", "containerDirective"],
        ondirective
      );
    }

    function ondirective(node: {
      data: any;
      name: string | undefined;
      attributes: Child;
    }) {
      var data = node.data || (node.data = {});
      var hast = h(node.name as any, node.attributes) as any;
      data.hName = node.name;
      data.hProperties = hast.properties;
    }
  }

  const theme = markdownTheme({
    "save-collection-button": (props: any) => {
      console.log(props);
      const { children } = props;
      return (
        <Button
          {...props}
          isLoading={savePublicCollectionResult.fetching}
          onClick={async () => {
            const result = await savePublicCollection({
              targetUserId: props.userId,
              collectionId: props.collectioIid,
            });
            if (result.data?.savePublicCollection.collection) {
              toast({
                id: "save-public-collection-success",
                title: `Successfuly saved collection`,
                status: "success",
                position: "top",
                duration: 2000,
              });
            } else {
              toast({
                id: "save-public-collection-error",
                title: `Failed to save collection`,
                status: "error",
                position: "top",
                duration: 2000,
              });
            }
          }}
        >
          {children}
        </Button>
      );
    },
  });

  return (
    <Box>
      <ReactMarkdown
        components={ChakraUIRenderer(theme)}
        remarkPlugins={[remarkGfm, remarkDirective, htmlDirectives]}
      >
        {content.trim()}
      </ReactMarkdown>
    </Box>
  );
};

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
            <MessageContent content={content} />
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
            <MessageContent content={message.content} />
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
            <MessageContent content={content} />
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
            <MessageContent content={message.content} />{" "}
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
  const boxRef = useRef<HTMLDivElement | null>(null);

  // Scroll box to bottom.
  useEffect(() => {
    if (boxRef.current) {
      const container = boxRef.current;
      container.scrollTop = container.scrollHeight;
    }
  });

  return (
    <Box ref={boxRef} padding="1em" h="100%" overflowY="scroll">
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
