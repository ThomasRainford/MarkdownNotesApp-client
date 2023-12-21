import { ChatPrivate, ChatRoom, Message, User } from "../generated/graphql";

export const testNotesLists = {
  collection1: [
    {
      id: "1",
      title: "List 1",
      createdAt: "2023-01-03T08:52:02.025+00:00",
      updatedAt: "2023-01-03T08:52:02.025+00:00",
      collection: {
        id: "1",
        visibility: "public",
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
        visibility: "public",
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
        visibility: "public",
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
        visibility: "public",
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
        visibility: "public",
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
        visibility: "public",
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
      visibility: "public",
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
  {
    id: "id2",
    username: "User02",
    email: "User02@mail.com",
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

export const testMessages = [
  {
    id: "message-1",
    content: "message1",
    updatedAt: "2023-01-03T08:52:02.025+00:00",
    createdAt: "2023-01-03T08:52:02.025+00:00",
    sender: {
      id: testUsers[0].id,
      username: testUsers[0].username,
      __typename: "User",
    },
    __typename: "Message",
  },
  {
    id: "message-2",
    content: "message2",
    updatedAt: "2023-01-03T08:52:02.025+00:00",
    createdAt: "2023-01-03T08:52:02.025+00:00",
    sender: {
      id: testUsers[0].id,
      username: testUsers[0].username,
      __typename: "User",
    },
    __typename: "Message",
  },
  {
    id: "message-3",
    content: "message1",
    updatedAt: "2023-01-03T08:52:02.025+00:00",
    createdAt: "2023-01-03T08:52:02.025+00:00",
    sender: {
      id: testUsers[1].id,
      username: testUsers[1].username,
      __typename: "User",
    },
    __typename: "Message",
  },
  {
    id: "message-4",
    content: "message2",
    updatedAt: "2023-01-03T08:52:02.025+00:00",
    createdAt: "2023-01-03T08:52:02.025+00:00",
    sender: {
      id: testUsers[1].id,
      username: testUsers[1].username,
      __typename: "User",
    },
    __typename: "Message",
  },
] as Message[];

export const testChatPrivates = [
  {
    id: "65820ab8e5688a580645e8f6",
    participants: [
      {
        id: "65820ab7e5688a580645e8c2",
        username: "User01",
        __typename: "User",
      },
      {
        id: "65820ab7e5688a580645e8c3",
        username: "User02",
        __typename: "User",
      },
    ],
    messages: [
      {
        id: "65820ab8e5688a580645e8f9",
        content: "message1",
        sender: {
          id: "65820ab7e5688a580645e8c2",
          username: "User01",
          __typename: "User",
        },
        __typename: "Message",
      },
      {
        id: "65820ab8e5688a580645e8fa",
        content: "message2",
        sender: {
          id: "65820ab7e5688a580645e8c2",
          username: "User01",
          __typename: "User",
        },
        __typename: "Message",
      },
      {
        id: "65820ab8e5688a580645e8fb",
        content: "message3",
        sender: {
          id: "65820ab7e5688a580645e8c2",
          username: "User01",
          __typename: "User",
        },
        __typename: "Message",
      },
    ],
    __typename: "ChatPrivate",
  },
  {
    id: "65820ab8e5688a580645e8f7",
    participants: [
      {
        id: "65820ab7e5688a580645e8c2",
        username: "User01",
        __typename: "User",
      },
      {
        id: "65820ab7e5688a580645e8c4",
        username: "User03",
        __typename: "User",
      },
    ],
    messages: [
      {
        id: "65820ab8e5688a580645e8fc",
        content: "message1",
        sender: {
          id: "65820ab7e5688a580645e8c4",
          username: "User03",
          __typename: "User",
        },
        __typename: "Message",
      },
      {
        id: "65820ab8e5688a580645e8fd",
        content: "message2",
        sender: {
          id: "65820ab7e5688a580645e8c4",
          username: "User03",
          __typename: "User",
        },
        __typename: "Message",
      },
      {
        id: "65820ab8e5688a580645e8fe",
        content: "message3",
        sender: {
          id: "65820ab7e5688a580645e8c4",
          username: "User03",
          __typename: "User",
        },
        __typename: "Message",
      },
    ],
    __typename: "ChatPrivate",
  },
] as ChatPrivate[];

export const testChatRooms = [
  {
    id: "65820ab8e5688a580645e8f8",
    members: [
      {
        id: "65820ab7e5688a580645e8c2",
        username: "User01",
        __typename: "User",
      },
      {
        id: "65820ab7e5688a580645e8c3",
        username: "User02",
        __typename: "User",
      },
      {
        id: "65820ab7e5688a580645e8c4",
        username: "User03",
        __typename: "User",
      },
    ],
    messages: [
      {
        id: "65820ab8e5688a580645e8ff",
        content: "I am user 1.",
        sender: {
          id: "65820ab7e5688a580645e8c2",
          username: "User01",
          __typename: "User",
        },
        __typename: "Message",
      },
      {
        id: "65820ab8e5688a580645e900",
        content: "I am user 2.",
        sender: {
          id: "65820ab7e5688a580645e8c3",
          username: "User02",
          __typename: "User",
        },
        __typename: "Message",
      },
      {
        id: "65820ab8e5688a580645e901",
        content: "I am user 3.",
        sender: {
          id: "65820ab7e5688a580645e8c4",
          username: "User03",
          __typename: "User",
        },
        __typename: "Message",
      },
    ],
    __typename: "ChatRoom",
  },
] as ChatRoom[];
