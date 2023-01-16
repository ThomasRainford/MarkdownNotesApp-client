export const testCollections = [
  {
    _id: 1,
    title: "Collection 1",
    upvotes: 0,
    lists: [
      {
        _id: 1,
        title: "List 1",
        notes: [
          {
            _id: 1,
            title: "Note 1",
            body: "Body 1",
            updatedAt: "2023-01-03T08:52:02.025+00:00",
          },
        ],
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
        notes: [
          {
            _id: 2,
            title: "Note 2",
            body: "Body 2",
            updatedAt: "2023-01-03T08:52:02.025+00:00",
          },
        ],
      },
      {
        _id: 21,
        title: "List 2-1",
        notes: [
          {
            _id: 2 - 1,
            title: "Note 2-1",
            body: "Body 2-1",
            updatedAt: "2023-01-03T08:52:02.025+00:00",
          },
        ],
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
        notes: [
          {
            _id: 3,
            title: "Note 3",
            body: "Body 3",
            updatedAt: "2023-01-03T08:52:02.025+00:00",
          },
        ],
      },
      {
        _id: 31,
        title: "List 3-1",
        notes: [
          {
            _id: 3 - 1,
            title: "Note 3-1",
            body: "Body 3-1",
            updatedAt: "2023-01-03T08:52:02.025+00:00",
          },
        ],
      },
      {
        _id: 32,
        title: "List 3-2",
        notes: [
          {
            _id: 3 - 2,
            title: "Note 3-2",
            body: "Body 3-2",
            updatedAt: "2023-01-03T08:52:02.025+00:00",
          },
        ],
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

export const testSelectedNote = {
  note: testCollections[0].lists[0].notes[0],
  list: testCollections[0].lists[0],
  collection: testCollections[0],
};
