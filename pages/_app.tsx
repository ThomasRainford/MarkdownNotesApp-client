import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Provider } from "urql";
import "../styles/globals.css";
import { theme } from "../styles/theme";
import { createUrqlClient } from "../utils/createUrqlClient";
import { NextPageWithLayout } from "./page";

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  const client = createUrqlClient();

  const component = (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );

  return getLayout(component);
}

export default MyApp;
