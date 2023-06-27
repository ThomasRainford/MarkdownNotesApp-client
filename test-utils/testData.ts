import { User } from "../generated/graphql";

export const testNotesLists = {
  collection1: [
    {
      id: "1",
      title: "List 1",
      createdAt: "2023-01-03T08:52:02.025+00:00",
      updatedAt: "2023-01-03T08:52:02.025+00:00",
      collection: {
        id: "1",
      },
      notes: [
        {
          id: "1",
          title: "Note 1",
          body: "Body 1",
          createdAt: "2023-01-03T08:52:02.025+00:00",
          updatedAt: "2023-01-03T08:52:02.025+00:00",
        },
      ],
    },
  ],
  collection2: [
    {
      id: "2",
      title: "List 2",
      createdAt: "2023-01-03T08:52:02.025+00:00",
      updatedAt: "2023-01-03T08:52:02.025+00:00",
      collection: {
        id: "2",
      },
      notes: [
        {
          id: "4",
          title: "Note 2",
          body: "Body 2",
          createdAt: "2023-01-03T08:52:02.025+00:00",
          updatedAt: "2023-01-03T08:52:02.025+00:00",
        },
      ],
    },
    {
      id: "21",
      title: "List 2-1",
      createdAt: "2023-01-03T08:52:02.025+00:00",
      updatedAt: "2023-01-03T08:52:02.025+00:00",
      collection: {
        id: "2",
      },
      notes: [
        {
          id: "5",
          title: "Note 2-1",
          body: "Body 2-1",
          createdAt: "2023-01-03T08:52:02.025+00:00",
          updatedAt: "2023-01-03T08:52:02.025+00:00",
        },
      ],
    },
  ],
  collection3: [
    {
      id: "3",
      title: "List 3",
      createdAt: "2023-01-03T08:52:02.025+00:00",
      updatedAt: "2023-01-03T08:52:02.025+00:00",
      collection: {
        id: "3",
      },
      notes: [
        {
          id: "6",
          title: "Note 3",
          body: "Body 3",
          createdAt: "2023-01-03T08:52:02.025+00:00",
          updatedAt: "2023-01-03T08:52:02.025+00:00",
        },
      ],
    },
    {
      id: "31",
      title: "List 3-1",
      createdAt: "2023-01-03T08:52:02.025+00:00",
      updatedAt: "2023-01-03T08:52:02.025+00:00",
      collection: {
        id: "3",
      },
      notes: [
        {
          id: "7",
          title: "Note 3-1",
          body: "Body 3-1",
          createdAt: "2023-01-03T08:52:02.025+00:00",
          updatedAt: "2023-01-03T08:52:02.025+00:00",
        },
      ],
    },
    {
      id: "32",
      title: "List 3-2",
      createdAt: "2023-01-03T08:52:02.025+00:00",
      updatedAt: "2023-01-03T08:52:02.025+00:00",
      collection: {
        id: "3",
      },
      notes: [
        {
          id: "8",
          title: "Note 3-2",
          body: "Body 3-2",
          updatedAt: "2023-01-03T08:52:02.025+00:00",
          createdAt: "2023-01-03T08:52:02.025+00:00",
        },
      ],
    },
  ],
};

export const _testCollections = [
  {
    id: "1",
    title: "Collection 1",
    visibility: "public",
    upvotes: 0,
    createdAt: "2023-01-03T08:52:02.025+00:00",
    updatedAt: "2023-01-03T08:52:02.025+00:00",
    owner: {
      id: "1",
      username: "User01",
    },
    lists: testNotesLists.collection1,
  },
  {
    id: "2",
    title: "Collection 2",
    visibility: "public",
    upvotes: 0,
    createdAt: "2023-01-03T08:52:02.025+00:00",
    updatedAt: "2023-01-03T08:52:02.025+00:00",
    owner: {
      id: "1",
      username: "User01",
    },
    lists: testNotesLists.collection2,
  },
  {
    id: "3",
    title: "Collection 3",
    visibility: "public",
    upvotes: 0,
    createdAt: "2023-01-03T08:52:02.025+00:00",
    updatedAt: "2023-01-03T08:52:02.025+00:00",
    owner: {
      id: "1",
      username: "User01",
    },
    lists: testNotesLists.collection3,
  },
];

export const createCollectionCollections = [
  ..._testCollections,
  {
    id: "4",
    title: "Collection 4",
    visibility: "public",
    upvotes: 0,
    createdAt: "2023-01-03T08:52:02.025+00:00",
    updatedAt: "2023-01-03T08:52:02.025+00:00",
    owner: {
      id: "1",
      username: "User01",
    },
    lists: testNotesLists.collection3,
  },
];

export const createNotesListNoteLists = [
  ...testNotesLists.collection1,
  {
    id: "2",
    title: "List 2",
    createdAt: "2023-01-03T08:52:02.025+00:00",
    updatedAt: "2023-01-03T08:52:02.025+00:00",
    collection: {
      id: "1",
    },
    notes: [],
  },
];

export const createNoteNotesList = {
  ...testNotesLists.collection1[0],
  notes: [
    ...testNotesLists.collection1[0].notes,
    {
      id: "2",
      title: "Note 2",
      body: "",
      createdAt: "2023-01-03T08:52:02.025+00:00",
      updatedAt: "2023-01-03T08:52:02.025+00:00",
    },
  ],
};

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
            createdAt: "2023-01-03T08:52:02.025+00:00",
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

export const testUsers = [
  {
    id: "id",
    username: "User01",
    email: "User01@mail.com",
    followers: [] as string[],
    following: [] as string[],
    upvoted: [] as string[],
  },
] as unknown as User[];

export const testUser = {
  _id: "kdslfj34r89sdkflj02983kj",
  id: "kdslfj34r89sdkflj02983kj",
  email: "user1@email.com",
  username: "User01",
  following: [],
  followers: [],
  upvoted: [],
  __typename: "User" as "User",
};

export const testSelectedNote = testCollections[0].lists[0].notes[0];
