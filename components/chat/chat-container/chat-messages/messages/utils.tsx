import { Code, Heading, ListItem, Text } from "@chakra-ui/react";

export const markdownTheme = (components: any, colorMode: "light" | "dark") => {
  const colorModeValue = (light: string, dark: string) => {
    return colorMode === "light" ? light : dark;
  };
  return {
    li: (props: any) => {
      const { children } = props;
      return <ListItem textColor={"white"}>{children}</ListItem>;
    },
    h1: (props: any) => {
      const { children } = props;
      return (
        <Heading as="h1" size="3xl" color={colorModeValue("white", "white")}>
          {children}
        </Heading>
      );
    },
    h2: (props: any) => {
      const { children } = props;
      return (
        <Heading as="h2" size="2xl" color={colorModeValue("white", "white")}>
          {children}
        </Heading>
      );
    },
    h3: (props: any) => {
      const { children } = props;
      return (
        <Heading as="h3" size="xl" color={colorModeValue("white", "white")}>
          {children}
        </Heading>
      );
    },
    h4: (props: any) => {
      const { children } = props;
      return (
        <Heading as="h4" size="lg" color={colorModeValue("white", "white")}>
          {children}
        </Heading>
      );
    },
    h5: (props: any) => {
      const { children } = props;
      return (
        <Heading as="h5" size="md" color={colorModeValue("white", "white")}>
          {children}
        </Heading>
      );
    },
    h6: (props: any) => {
      const { children } = props;
      return (
        <Heading as="h6" size="sm" color={colorModeValue("white", "white")}>
          {children}
        </Heading>
      );
    },
    p: (props: any) => {
      const { children } = props;
      return <Text color={"white"}>{children}</Text>;
    },
    code: (props: any) => {
      const { children } = props;
      return (
        <Code bg={colorModeValue("blue.400", "blue.500")} textColor={"white"}>
          {children}
        </Code>
      );
    },
    blockquote: (props: any) => {
      const { children } = props;
      return (
        <Code
          as="blockquote"
          p={2}
          bg={colorModeValue("blue.400", "blue.500")}
          textColor={"white"}
        >
          {children}
        </Code>
      );
    },
    ...components,
  };
};
