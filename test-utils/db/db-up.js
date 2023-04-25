// This file is a script for seeding a database with test data
// and will be used for e2e testing.

/**
 * Insert users.
 */
db.user.insertMany([
  {
    _id: new ObjectId("111111111111111111111111"),
    email: "user01@mail.com",
    username: "User01",
    password: "$argon2i$v=19$m=16,t=2,p=1$cXdlcnR5dWk$96NSCvpc+wrSDbiZgCJrxg",
    following: [],
    followers: [],
    upvoted: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId("222222222222222222222222"),
    email: "user02@mail.com",
    username: "User02",
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
    _id: new ObjectId("c11111111111111111111111"),
    owner: new ObjectId("111111111111111111111111"),
    title: "Collection 1",
    upvotes: 0,
    visibility: "public",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId("c22222222222222222222222"),
    owner: new ObjectId("111111111111111111111111"),
    title: "Collection 2",
    upvotes: 0,
    visibility: "private",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId("c33333333333333333333333"),
    owner: new ObjectId("222222222222222222222222"),
    title: "Collection 1",
    upvotes: 0,
    visibility: "private",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId("c44444444444444444444444"),
    owner: new ObjectId("222222222222222222222222"),
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
    collection: new ObjectId("c11111111111111111111111"),
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
    collection: new ObjectId("c22222222222222222222222"),
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
    collection: new ObjectId("c33333333333333333333333"),
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
    collection: new ObjectId("c44444444444444444444444"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);
