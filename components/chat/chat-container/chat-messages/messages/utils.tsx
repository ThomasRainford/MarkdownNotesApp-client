import { Heading, ListItem } from "@chakra-ui/react";

export const markdownTheme = (components: any) => {
  return {
    li: (props: any) => {
      const { children } = props;
      return <ListItem>{children}</ListItem>;
    },
    h1: (props: any) => {
      const { children } = props;
      return (
        <Heading as="h1" size="3xl">
          {children}
        </Heading>
      );
    },
    h2: (props: any) => {
      const { children } = props;
      return (
        <Heading as="h2" size="2xl">
          {children}
        </Heading>
      );
    },
    h3: (props: any) => {
      const { children } = props;
      return (
        <Heading as="h3" size="xl">
          {children}
        </Heading>
      );
    },
    h4: (props: any) => {
      const { children } = props;
      return (
        <Heading as="h4" size="lg">
          {children}
        </Heading>
      );
    },
    h5: (props: any) => {
      const { children } = props;
      return (
        <Heading as="h5" size="md">
          {children}
        </Heading>
      );
    },
    h6: (props: any) => {
      const { children } = props;
      return (
        <Heading as="h6" size="sm">
          {children}
        </Heading>
      );
    },
    ...components,
  };
};
