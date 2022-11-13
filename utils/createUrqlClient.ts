import { cacheExchange } from "@urql/exchange-graphcache";
import { SSRExchange } from "next-urql";
import { dedupExchange, fetchExchange } from "urql";

export const createUrqlClient = (ssrExchange: SSRExchange) => {
  return {
    url: process.env.NEXT_PUBLIC_API_URL,
    exchanges: [dedupExchange, cacheExchange({}), fetchExchange, ssrExchange],
    fetchOptions: {
      credentials: "include" as const,
    },
  };
};
