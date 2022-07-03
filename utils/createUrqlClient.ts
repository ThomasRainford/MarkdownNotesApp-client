import { cacheExchange } from "@urql/exchange-graphcache";
import { createClient, dedupExchange, fetchExchange } from "urql";

export const createUrqlClient = () => {
  return createClient({
    url: process.env.NEXT_PUBLIC_API_URL,
    exchanges: [dedupExchange, cacheExchange({}), fetchExchange],
    fetchOptions: {
      credentials: "include" as const,
    },
  });
};
