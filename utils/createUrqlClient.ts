import { Cache, cacheExchange } from "@urql/exchange-graphcache";
import { SSRExchange } from "next-urql";
import { dedupExchange, fetchExchange } from "urql";

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

const invalidateFollowing = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "following");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "following", fi.arguments || null);
  });
};

const invalidateFollowers = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "followers");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "followers", fi.arguments || null);
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

const invalidateNotesList = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "notesList");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "notesList", fi.arguments || null);
  });
};

export const createUrqlClient = (ssrExchange: SSRExchange) => {
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
              invalidateFollowing(cache);
              invalidateFollowing(cache);
              invalidateFollowers(cache);
              invalidateCollections(cache);
              invalidateNotesLists(cache);
              invalidateNotesList(cache);
            },
            createCollection: (_result, _args, cache, _info) => {
              invalidateCollections(cache);
            },
            createNotesList: (_result, _args, cache, _info) => {
              invalidateCollections(cache);
              invalidateNotesLists(cache);
            },
            addNote: (_result, _args, cache, _info) => {
              invalidateNotesList(cache);
            },
            updateCollection: (_result, _args, cache, _info) => {
              invalidateCollections(cache);
            },
            updateNotesList: (_result, _args, cache, _info) => {
              invalidateCollections(cache);
            },
            deleteCollection: (_result, _args, cache, _info) => {
              invalidateCollections(cache);
            },
            deleteNotesList: (_result, _args, cache, _info) => {
              invalidateNotesLists(cache);
            },
            deleteNote: (_result, _args, cache, _info) => {
              invalidateNotesLists(cache);
            },
            savePublicCollection: (_result, _args, cache, _info) => {
              invalidateCollections(cache);
              invalidateNotesLists(cache);
            },
          },
        },
      }),
      fetchExchange,
      ssrExchange,
    ],
    fetchOptions: {
      credentials: "include" as const,
    },
  };
};
