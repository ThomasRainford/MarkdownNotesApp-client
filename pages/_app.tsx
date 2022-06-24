import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { theme } from "../styles/theme";
import { NextPageWithLayout } from "./page";

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  const component = (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );

  return getLayout(component);
}

export default MyApp;
