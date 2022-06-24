import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";

export const createUrqlClient = () => {
  return {
    url: process.env.REACT_APP_API_URL,
    exchanges: [dedupExchange, cacheExchange({}), fetchExchange],
    fetchOptions: {
      credentials: "include" as const,
    },
  };
};
