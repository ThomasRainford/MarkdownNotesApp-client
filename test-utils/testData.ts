export const testCollections = [
  {
    _id: 1,
    title: "Collection 1",
    upvotes: 0,
    lists: [
      {
        _id: 1,
        title: "List 1",
        notes: [{ _id: 1, title: "Note 1", body: "Body 1" }],
      },
    ],
  },
  {
    _id: 2,
    title: "Collection 2",
    upvotes: 0,
    lists: [
      {
        _id: 2,
        title: "List 2",
        notes: [{ _id: 2, title: "Note 2", body: "Body 2" }],
      },
    ],
  },
  {
    _id: 3,
    title: "Collection 3",
    upvotes: 0,
    lists: [
      {
        _id: 3,
        title: "List 3",
        notes: [{ _id: 3, title: "Note 3", body: "Body 3" }],
      },
    ],
  },
];

export const testUser = {
  _id: "kdslfj34r89sdkflj02983kj",
  email: "user1@email.com",
  username: "User01",
  following: [],
  followers: [],
  upvoted: [],
  __typename: "User" as "User",
};
