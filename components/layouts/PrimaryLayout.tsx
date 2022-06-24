import { Container } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface Props {
  children: ReactNode;
}

const PrimaryLayout = ({ children }: Props): JSX.Element => {
  return (
    <Container p="0" minW="100%" h="calc(100vh)">
      {children}
    </Container>
  );
};

export default PrimaryLayout;
