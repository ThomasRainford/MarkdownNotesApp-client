// This file is a script for seeding a database with test data
// and will be used for e2e testing.

/**
 * Insert users.
 */
db.user.insertMany([
  {
    _id: 1,
    email: "user1@mail.com",
    username: "User1",
    password: "$argon2i$v=19$m=16,t=2,p=1$cXdlcnR5dWk$96NSCvpc+wrSDbiZgCJrxg",
    following: [],
    followers: [],
    upvoted: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 2,
    email: "user2@mail.com",
    username: "User2",
    password: "$argon2i$v=19$m=16,t=2,p=1$cXdlcnR5dWk$96NSCvpc+wrSDbiZgCJrxg",
    following: [],
    followers: [],
    upvoted: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

/**
 * Insert Collections.
 */
db.collection.insertMany([
  {
    _id: 11,
    owner: 1,
    title: "Collection 1",
    upvotes: 0,
    visibility: "public",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 12,
    owner: 1,
    title: "Collection 2",
    upvotes: 0,
    visibility: "private",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 21,
    owner: 2,
    title: "Collection 1",
    upvotes: 0,
    visibility: "private",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 22,
    owner: 2,
    title: "Collection 2",
    upvotes: 0,
    visibility: "public",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

/**
 * Insert NotesLists.
 */
db["notes-list"].insertMany([
  {
    title: "List 1",
    notes: [
      {
        id: "note-1",
        title: "Note 1",
        body: "Body 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    collection: 11,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "List 1",
    notes: [
      {
        id: "note-2",
        title: "Note 1",
        body: "Body 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    collection: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "List 1",
    notes: [
      {
        id: "note-3",
        title: "Note 1",
        body: "Body 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    collection: 21,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "List 1",
    notes: [
      {
        id: "note-4",
        title: "Note 1",
        body: "Body 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    collection: 22,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);
