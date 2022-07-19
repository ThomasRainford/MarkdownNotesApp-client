import { cacheExchange } from "@urql/exchange-graphcache";
import { createClient, dedupExchange, fetchExchange, ssrExchange } from "urql";

const isServerSide = typeof window === "undefined";

const ssr = ssrExchange({
  isClient: !isServerSide,
  initialState: !isServerSide ? (window as any).__URQL_DATA__ : undefined,
});

export const createUrqlClient = () => {
  return createClient({
    url: process.env.NEXT_PUBLIC_API_URL,
    exchanges: [dedupExchange, cacheExchange({}), fetchExchange, ssr],
    fetchOptions: {
      credentials: "include" as const,
    },
  });
};
