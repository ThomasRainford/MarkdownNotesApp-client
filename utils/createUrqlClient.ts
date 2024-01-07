import { Cache, cacheExchange } from "@urql/exchange-graphcache";
import { SSRExchange } from "next-urql";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { dedupExchange, fetchExchange, subscriptionExchange } from "urql";

const invalidateUser = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "user");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "user", fi.arguments || null);
  });
};

const invalidateMe = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "me");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "me", fi.arguments || null);
  });
};

const invalidateUserCollections = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter(
    (info) => info.fieldName === "userCollections"
  );
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "userCollections", fi.arguments || null);
  });
};

const invalidateUserFollowing = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter(
    (info) => info.fieldName === "userFollowing"
  );
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "userFollowing", fi.arguments || null);
  });
};

const invalidateUserFollowers = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter(
    (info) => info.fieldName === "userFollowers"
  );
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "userFollowers", fi.arguments || null);
  });
};

const invalidateUserVotes = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "userVotes");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "userVotes", fi.arguments || null);
  });
};

const invalidateCollections = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter(
    (info) => info.fieldName === "collections"
  );
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "collections", fi.arguments || null);
  });
};

const invalidateNotesLists = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter(
    (info) => info.fieldName === "notesLists"
  );
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "notesLists", fi.arguments || null);
  });
};

const invalidateUserNotesLists = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter(
    (info) => info.fieldName === "userNotesLists"
  );
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "userNotesLists", fi.arguments || null);
  });
};

const invalidateNotesList = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "notesList");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "notesList", fi.arguments || null);
  });
};

const invalidateChatPrivates = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter(
    (info) => info.fieldName === "chatPrivates"
  );
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "chatPrivates", fi.arguments || null);
  });
};

const invalidateChatRooms = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "chatRooms");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "chatRooms", fi.arguments || null);
  });
};

const createSubscriptionClient = (options: { userId: string }): any => {
  return process.browser
    ? (new SubscriptionClient(
        `ws://${process.env.NEXT_PUBLIC_API_URL.replace(
          /^https?:\/\//,
          ""
        ).replace("graphql", "subscriptions")}`,
        {
          reconnect: true,
          connectionParams: {
            userId: options.userId,
          },
        }
      ) as any)
    : null;
};

export const createUrqlClient = (ssrExchange: SSRExchange, userId?: string) => {
  return {
    url: process.env.NEXT_PUBLIC_API_URL,
    exchanges: [
      dedupExchange,
      cacheExchange({
        updates: {
          Mutation: {
            logout: (_result, _args, cache, _info) => {
              invalidateUser(cache);
              invalidateMe(cache);
              invalidateUserCollections(cache);
              invalidateUserFollowing(cache);
              invalidateUserFollowers(cache);
              invalidateCollections(cache);
              invalidateNotesLists(cache);
              invalidateUserNotesLists(cache);
              invalidateNotesList(cache);
              invalidateChatPrivates(cache);
              invalidateChatRooms(cache);
            },
            createCollection: (_result, _args, cache, _info) => {
              invalidateCollections(cache);
              invalidateUserCollections(cache);
            },
            createNotesList: (_result, _args, cache, _info) => {
              invalidateCollections(cache);
              invalidateNotesLists(cache);
              invalidateUserNotesLists(cache);
            },
            addNote: (_result, _args, cache, _info) => {
              invalidateNotesList(cache);
              invalidateUserNotesLists(cache);
            },
            updateCollection: (_result, _args, cache, _info) => {
              invalidateCollections(cache);
              invalidateUserCollections(cache);
            },
            updateNotesList: (_result, _args, cache, _info) => {
              invalidateCollections(cache);
              invalidateUserCollections(cache);
            },
            deleteCollection: (_result, _args, cache, _info) => {
              invalidateCollections(cache);
              invalidateUserCollections(cache);
            },
            deleteNotesList: (_result, _args, cache, _info) => {
              invalidateNotesLists(cache);
              invalidateUserNotesLists(cache);
            },
            deleteNote: (_result, _args, cache, _info) => {
              invalidateNotesLists(cache);
              invalidateUserNotesLists(cache);
            },
            savePublicCollection: (_result, _args, cache, _info) => {
              invalidateCollections(cache);
              invalidateUserCollections(cache);
              invalidateNotesLists(cache);
              invalidateUserNotesLists(cache);
            },
            vote: (_result, _args, cache, _info) => {
              invalidateUser(cache);
              invalidateMe(cache);
              invalidateCollections(cache);
              invalidateUserCollections(cache);
              invalidateUserVotes(cache);
            },
            updateUser: (_result, _args, cache, _info) => {
              invalidateUser(cache);
            },
            follow: (_result, _args, cache, _info) => {
              invalidateMe(cache);
              invalidateUser(cache);
              invalidateUserFollowing(cache);
              invalidateUserFollowers(cache);
            },
          },
        },
      }),
      fetchExchange,
      ssrExchange,
      subscriptionExchange({
        forwardSubscription: (request) => {
          const subscriptionClient = createSubscriptionClient({
            userId: userId || "",
          });
          return subscriptionClient.request(request);
        },
      }),
    ],
    fetchOptions: {
      credentials: "include" as const,
    },
  };
};
