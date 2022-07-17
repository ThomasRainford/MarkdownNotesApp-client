import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type ActivityFeedResponse = {
  __typename?: 'ActivityFeedResponse';
  activity: Scalars['String'];
  collection: Collection;
};

export type Collection = {
  __typename?: 'Collection';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  lists: Array<NotesList>;
  owner: User;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  upvotes: Scalars['Float'];
  visibility: Scalars['String'];
};

export type CollectionResponse = {
  __typename?: 'CollectionResponse';
  collection?: Maybe<Collection>;
  error?: Maybe<Error>;
};

export type CollectionUpdateInput = {
  title?: InputMaybe<Scalars['String']>;
  visibility?: InputMaybe<Scalars['String']>;
};

export type Error = {
  __typename?: 'Error';
  message: Scalars['String'];
  property: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ListLocationInput = {
  collectionId: Scalars['String'];
  listId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addNote: NoteResponse;
  createCollection: CollectionResponse;
  createNotesList: NotesListResponse;
  deleteCollection: Scalars['Boolean'];
  deleteNote: Scalars['Boolean'];
  deleteNotesList: Scalars['Boolean'];
  follow: Scalars['Boolean'];
  forgotPassword: UserResponse;
  login: UserResponse;
  logout?: Maybe<User>;
  moveList: NotesListResponse;
  register: UserResponse;
  resetPassword: UserResponse;
  savePublicCollection: CollectionResponse;
  updateCollection: CollectionResponse;
  updateNote: NoteResponse;
  updateNotesList: NotesListResponse;
  updateUser: UserResponse;
  vote: CollectionResponse;
};


export type MutationAddNoteArgs = {
  listLocation: ListLocationInput;
  noteInput: NoteInput;
};


export type MutationCreateCollectionArgs = {
  title: Scalars['String'];
  visibility: Scalars['String'];
};


export type MutationCreateNotesListArgs = {
  collectionId: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteCollectionArgs = {
  id: Scalars['String'];
};


export type MutationDeleteNoteArgs = {
  noteLocation: NoteLocationInput;
};


export type MutationDeleteNotesListArgs = {
  listLocation: ListLocationInput;
};


export type MutationFollowArgs = {
  targetUserId: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationMoveListArgs = {
  listLocation: ListLocationInput;
  newCollectionId: Scalars['String'];
};


export type MutationRegisterArgs = {
  registerInput: UserRegisterInput;
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationSavePublicCollectionArgs = {
  collectionId: Scalars['String'];
  targetUserId: Scalars['String'];
};


export type MutationUpdateCollectionArgs = {
  collectionInput: CollectionUpdateInput;
  id: Scalars['String'];
};


export type MutationUpdateNoteArgs = {
  noteInput: NoteUpdateInput;
  noteLocaton: NoteLocationInput;
};


export type MutationUpdateNotesListArgs = {
  listLocation: ListLocationInput;
  notesListInput: NotesListUpdateInput;
};


export type MutationUpdateUserArgs = {
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type MutationVoteArgs = {
  id: Scalars['String'];
};

export type Note = {
  __typename?: 'Note';
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type NoteInput = {
  body: Scalars['String'];
  title: Scalars['String'];
};

export type NoteLocationInput = {
  collectionId: Scalars['String'];
  listId: Scalars['String'];
  noteId: Scalars['String'];
};

export type NoteResponse = {
  __typename?: 'NoteResponse';
  error?: Maybe<Error>;
  note?: Maybe<Note>;
};

export type NoteUpdateInput = {
  body?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type NotesList = {
  __typename?: 'NotesList';
  _id: Scalars['ID'];
  collection: Collection;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  notes: Array<Note>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type NotesListResponse = {
  __typename?: 'NotesListResponse';
  error?: Maybe<Error>;
  notesList?: Maybe<NotesList>;
};

export type NotesListUpdateInput = {
  title?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  activityFeed?: Maybe<Array<ActivityFeedResponse>>;
  collection: CollectionResponse;
  collections: Array<Collection>;
  followers: Array<User>;
  following: Array<User>;
  me?: Maybe<User>;
  note: NoteResponse;
  notesList?: Maybe<NotesList>;
  notesLists?: Maybe<Array<NotesList>>;
  publicNotes?: Maybe<Array<Collection>>;
  user?: Maybe<User>;
  userCollections: Array<Collection>;
};


export type QueryCollectionArgs = {
  id?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};


export type QueryNoteArgs = {
  noteLocation: NoteLocationInput;
};


export type QueryNotesListArgs = {
  listLocation: ListLocationInput;
};


export type QueryNotesListsArgs = {
  collectionId: Scalars['String'];
};


export type QueryPublicNotesArgs = {
  username: Scalars['String'];
};


export type QueryUserArgs = {
  username: Scalars['String'];
};


export type QueryUserCollectionsArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  collections: Array<Collection>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  followers: Array<Scalars['String']>;
  following: Array<Scalars['String']>;
  id: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  upvoted: Array<Scalars['String']>;
  username: Scalars['String'];
};

export type UserRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, email: string, username: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'User', username: string } | null };

export type RegisterMutationVariables = Exact<{
  registerInput: UserRegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, username: string, email: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', _id: string, email: string, username: string, following: Array<string>, followers: Array<string>, upvoted: Array<string> } | null };


export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    user {
      id
      email
      username
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    username
  }
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($registerInput: UserRegisterInput!) {
  register(registerInput: $registerInput) {
    user {
      id
      username
      email
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    _id
    email
    username
    following
    followers
    upvoted
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};