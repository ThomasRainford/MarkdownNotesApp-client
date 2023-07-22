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
  userFollowers: Array<User>;
  userFollowing: Array<User>;
  userVotes: Array<Collection>;
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


export type QueryUserFollowersArgs = {
  userId: Scalars['String'];
};


export type QueryUserFollowingArgs = {
  userId: Scalars['String'];
};


export type QueryUserVotesArgs = {
  userId: Scalars['String'];
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

export type AddNoteMutationVariables = Exact<{
  listLocation: ListLocationInput;
  noteInput: NoteInput;
}>;


export type AddNoteMutation = { __typename?: 'Mutation', addNote: { __typename?: 'NoteResponse', note?: { __typename?: 'Note', id: string, title: string, body: string, createdAt: any, updatedAt: any } | null, error?: { __typename?: 'Error', property: string, message: string } | null } };

export type CreateCollectionMutationVariables = Exact<{
  title: Scalars['String'];
  visibility: Scalars['String'];
}>;


export type CreateCollectionMutation = { __typename?: 'Mutation', createCollection: { __typename?: 'CollectionResponse', collection?: { __typename?: 'Collection', id: string, title: string } | null, error?: { __typename?: 'Error', property: string, message: string } | null } };

export type CreateNotesListMutationVariables = Exact<{
  collectionId: Scalars['String'];
  title: Scalars['String'];
}>;


export type CreateNotesListMutation = { __typename?: 'Mutation', createNotesList: { __typename?: 'NotesListResponse', notesList?: { __typename?: 'NotesList', id: string, title: string } | null, error?: { __typename?: 'Error', property: string, message: string } | null } };

export type DeleteCollectionMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteCollectionMutation = { __typename?: 'Mutation', deleteCollection: boolean };

export type DeleteNoteMutationVariables = Exact<{
  noteLocation: NoteLocationInput;
}>;


export type DeleteNoteMutation = { __typename?: 'Mutation', deleteNote: boolean };

export type DeleteNotesListMutationVariables = Exact<{
  listLocation: ListLocationInput;
}>;


export type DeleteNotesListMutation = { __typename?: 'Mutation', deleteNotesList: boolean };

export type FollowMutationVariables = Exact<{
  targetUserId: Scalars['String'];
}>;


export type FollowMutation = { __typename?: 'Mutation', follow: boolean };

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

export type SavePublicCollectionMutationVariables = Exact<{
  targetUserId: Scalars['String'];
  collectionId: Scalars['String'];
}>;


export type SavePublicCollectionMutation = { __typename?: 'Mutation', savePublicCollection: { __typename?: 'CollectionResponse', collection?: { __typename?: 'Collection', id: string, title: string } | null, error?: { __typename?: 'Error', property: string, message: string } | null } };

export type UpdateCollectionMutationVariables = Exact<{
  id: Scalars['String'];
  collectionInput: CollectionUpdateInput;
}>;


export type UpdateCollectionMutation = { __typename?: 'Mutation', updateCollection: { __typename?: 'CollectionResponse', collection?: { __typename?: 'Collection', id: string, title: string, visibility: string, upvotes: number, createdAt: any, updatedAt: any, owner: { __typename?: 'User', id: string, username: string }, lists: Array<{ __typename?: 'NotesList', id: string, title: string }> } | null, error?: { __typename?: 'Error', property: string, message: string } | null } };

export type UpdateNoteMutationVariables = Exact<{
  noteLocation: NoteLocationInput;
  noteInput: NoteUpdateInput;
}>;


export type UpdateNoteMutation = { __typename?: 'Mutation', updateNote: { __typename?: 'NoteResponse', note?: { __typename?: 'Note', id: string, title: string, body: string, createdAt: any, updatedAt: any } | null, error?: { __typename?: 'Error', property: string, message: string } | null } };

export type UpdateNotesListMutationVariables = Exact<{
  listLocation: ListLocationInput;
  notesListInput: NotesListUpdateInput;
}>;


export type UpdateNotesListMutation = { __typename?: 'Mutation', updateNotesList: { __typename?: 'NotesListResponse', notesList?: { __typename?: 'NotesList', id: string, title: string, createdAt: any, updatedAt: any, collection: { __typename?: 'Collection', id: string }, notes: Array<{ __typename?: 'Note', id: string, title: string, body: string, createdAt: any, updatedAt: any }> } | null, error?: { __typename?: 'Error', property: string, message: string } | null } };

export type UpdateUserMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, email: string, username: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CollectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type CollectionsQuery = { __typename?: 'Query', collections: Array<{ __typename?: 'Collection', id: string, title: string, visibility: string, upvotes: number, createdAt: any, updatedAt: any, owner: { __typename?: 'User', id: string, username: string }, lists: Array<{ __typename?: 'NotesList', id: string, title: string, collection: { __typename?: 'Collection', id: string }, notes: Array<{ __typename?: 'Note', id: string, title: string, body: string, createdAt: any, updatedAt: any }> }> }> };

export type FollowersQueryVariables = Exact<{ [key: string]: never; }>;


export type FollowersQuery = { __typename?: 'Query', followers: Array<{ __typename?: 'User', id: string, username: string, email: string, following: Array<string>, followers: Array<string>, collections: Array<{ __typename?: 'Collection', id: string }> }> };

export type FollowingQueryVariables = Exact<{ [key: string]: never; }>;


export type FollowingQuery = { __typename?: 'Query', following: Array<{ __typename?: 'User', id: string, username: string, email: string, following: Array<string>, followers: Array<string>, collections: Array<{ __typename?: 'Collection', id: string }> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', _id: string, id: string, email: string, username: string, following: Array<string>, followers: Array<string>, upvoted: Array<string> } | null };

export type NotesListsQueryVariables = Exact<{
  collectionId: Scalars['String'];
}>;


export type NotesListsQuery = { __typename?: 'Query', notesLists?: Array<{ __typename?: 'NotesList', id: string, title: string, createdAt: any, updatedAt: any, collection: { __typename?: 'Collection', id: string }, notes: Array<{ __typename?: 'Note', id: string, title: string, body: string, createdAt: any, updatedAt: any }> }> | null };

export type NotesListQueryVariables = Exact<{
  listLocation: ListLocationInput;
}>;


export type NotesListQuery = { __typename?: 'Query', notesList?: { __typename?: 'NotesList', id: string, title: string, createdAt: any, updatedAt: any, collection: { __typename?: 'Collection', id: string }, notes: Array<{ __typename?: 'Note', id: string, title: string, body: string, createdAt: any, updatedAt: any }> } | null };

export type UserCollectionsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserCollectionsQuery = { __typename?: 'Query', userCollections: Array<{ __typename?: 'Collection', id: string, title: string, visibility: string, upvotes: number, owner: { __typename?: 'User', id: string, username: string }, lists: Array<{ __typename?: 'NotesList', id: string, title: string }> }> };

export type UserFollowersQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserFollowersQuery = { __typename?: 'Query', userFollowers: Array<{ __typename?: 'User', id: string, username: string, email: string, collections: Array<{ __typename?: 'Collection', id: string }> }> };

export type UserFollowingQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserFollowingQuery = { __typename?: 'Query', userFollowing: Array<{ __typename?: 'User', id: string, username: string, email: string, collections: Array<{ __typename?: 'Collection', id: string }> }> };

export type UserVotesQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserVotesQuery = { __typename?: 'Query', userVotes: Array<{ __typename?: 'Collection', id: string, title: string, visibility: string, upvotes: number, owner: { __typename?: 'User', id: string, username: string }, lists: Array<{ __typename?: 'NotesList', id: string, title: string }> }> };

export type UserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', _id: string, id: string, email: string, username: string, following: Array<string>, followers: Array<string>, upvoted: Array<string> } | null };


export const AddNoteDocument = gql`
    mutation AddNote($listLocation: ListLocationInput!, $noteInput: NoteInput!) {
  addNote(listLocation: $listLocation, noteInput: $noteInput) {
    note {
      id
      title
      body
      createdAt
      updatedAt
    }
    error {
      property
      message
    }
  }
}
    `;

export function useAddNoteMutation() {
  return Urql.useMutation<AddNoteMutation, AddNoteMutationVariables>(AddNoteDocument);
};
export const CreateCollectionDocument = gql`
    mutation CreateCollection($title: String!, $visibility: String!) {
  createCollection(title: $title, visibility: $visibility) {
    collection {
      id
      title
    }
    error {
      property
      message
    }
  }
}
    `;

export function useCreateCollectionMutation() {
  return Urql.useMutation<CreateCollectionMutation, CreateCollectionMutationVariables>(CreateCollectionDocument);
};
export const CreateNotesListDocument = gql`
    mutation CreateNotesList($collectionId: String!, $title: String!) {
  createNotesList(collectionId: $collectionId, title: $title) {
    notesList {
      id
      title
    }
    error {
      property
      message
    }
  }
}
    `;

export function useCreateNotesListMutation() {
  return Urql.useMutation<CreateNotesListMutation, CreateNotesListMutationVariables>(CreateNotesListDocument);
};
export const DeleteCollectionDocument = gql`
    mutation DeleteCollection($id: String!) {
  deleteCollection(id: $id)
}
    `;

export function useDeleteCollectionMutation() {
  return Urql.useMutation<DeleteCollectionMutation, DeleteCollectionMutationVariables>(DeleteCollectionDocument);
};
export const DeleteNoteDocument = gql`
    mutation DeleteNote($noteLocation: NoteLocationInput!) {
  deleteNote(noteLocation: $noteLocation)
}
    `;

export function useDeleteNoteMutation() {
  return Urql.useMutation<DeleteNoteMutation, DeleteNoteMutationVariables>(DeleteNoteDocument);
};
export const DeleteNotesListDocument = gql`
    mutation DeleteNotesList($listLocation: ListLocationInput!) {
  deleteNotesList(listLocation: $listLocation)
}
    `;

export function useDeleteNotesListMutation() {
  return Urql.useMutation<DeleteNotesListMutation, DeleteNotesListMutationVariables>(DeleteNotesListDocument);
};
export const FollowDocument = gql`
    mutation Follow($targetUserId: String!) {
  follow(targetUserId: $targetUserId)
}
    `;

export function useFollowMutation() {
  return Urql.useMutation<FollowMutation, FollowMutationVariables>(FollowDocument);
};
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
export const SavePublicCollectionDocument = gql`
    mutation SavePublicCollection($targetUserId: String!, $collectionId: String!) {
  savePublicCollection(targetUserId: $targetUserId, collectionId: $collectionId) {
    collection {
      id
      title
    }
    error {
      property
      message
    }
  }
}
    `;

export function useSavePublicCollectionMutation() {
  return Urql.useMutation<SavePublicCollectionMutation, SavePublicCollectionMutationVariables>(SavePublicCollectionDocument);
};
export const UpdateCollectionDocument = gql`
    mutation UpdateCollection($id: String!, $collectionInput: CollectionUpdateInput!) {
  updateCollection(id: $id, collectionInput: $collectionInput) {
    collection {
      id
      title
      visibility
      upvotes
      createdAt
      updatedAt
      owner {
        id
        username
      }
      lists {
        id
        title
      }
    }
    error {
      property
      message
    }
  }
}
    `;

export function useUpdateCollectionMutation() {
  return Urql.useMutation<UpdateCollectionMutation, UpdateCollectionMutationVariables>(UpdateCollectionDocument);
};
export const UpdateNoteDocument = gql`
    mutation UpdateNote($noteLocation: NoteLocationInput!, $noteInput: NoteUpdateInput!) {
  updateNote(noteLocaton: $noteLocation, noteInput: $noteInput) {
    note {
      id
      title
      body
      createdAt
      updatedAt
    }
    error {
      property
      message
    }
  }
}
    `;

export function useUpdateNoteMutation() {
  return Urql.useMutation<UpdateNoteMutation, UpdateNoteMutationVariables>(UpdateNoteDocument);
};
export const UpdateNotesListDocument = gql`
    mutation UpdateNotesList($listLocation: ListLocationInput!, $notesListInput: NotesListUpdateInput!) {
  updateNotesList(listLocation: $listLocation, notesListInput: $notesListInput) {
    notesList {
      id
      title
      createdAt
      updatedAt
      collection {
        id
      }
      notes {
        id
        title
        body
        createdAt
        updatedAt
      }
    }
    error {
      property
      message
    }
  }
}
    `;

export function useUpdateNotesListMutation() {
  return Urql.useMutation<UpdateNotesListMutation, UpdateNotesListMutationVariables>(UpdateNotesListDocument);
};
export const UpdateUserDocument = gql`
    mutation UpdateUser($username: String, $password: String) {
  updateUser(username: $username, password: $password) {
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

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
};
export const CollectionsDocument = gql`
    query collections {
  collections {
    id
    title
    visibility
    upvotes
    createdAt
    updatedAt
    owner {
      id
      username
    }
    lists {
      id
      title
      collection {
        id
      }
      notes {
        id
        title
        body
        createdAt
        updatedAt
      }
    }
  }
}
    `;

export function useCollectionsQuery(options?: Omit<Urql.UseQueryArgs<CollectionsQueryVariables>, 'query'>) {
  return Urql.useQuery<CollectionsQuery, CollectionsQueryVariables>({ query: CollectionsDocument, ...options });
};
export const FollowersDocument = gql`
    query Followers {
  followers {
    id
    username
    email
    following
    followers
    collections {
      id
    }
  }
}
    `;

export function useFollowersQuery(options?: Omit<Urql.UseQueryArgs<FollowersQueryVariables>, 'query'>) {
  return Urql.useQuery<FollowersQuery, FollowersQueryVariables>({ query: FollowersDocument, ...options });
};
export const FollowingDocument = gql`
    query Following {
  following {
    id
    username
    email
    following
    followers
    collections {
      id
    }
  }
}
    `;

export function useFollowingQuery(options?: Omit<Urql.UseQueryArgs<FollowingQueryVariables>, 'query'>) {
  return Urql.useQuery<FollowingQuery, FollowingQueryVariables>({ query: FollowingDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    _id
    id
    email
    username
    following
    followers
    upvoted
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const NotesListsDocument = gql`
    query NotesLists($collectionId: String!) {
  notesLists(collectionId: $collectionId) {
    id
    title
    createdAt
    updatedAt
    collection {
      id
    }
    notes {
      id
      title
      body
      createdAt
      updatedAt
    }
  }
}
    `;

export function useNotesListsQuery(options: Omit<Urql.UseQueryArgs<NotesListsQueryVariables>, 'query'>) {
  return Urql.useQuery<NotesListsQuery, NotesListsQueryVariables>({ query: NotesListsDocument, ...options });
};
export const NotesListDocument = gql`
    query NotesList($listLocation: ListLocationInput!) {
  notesList(listLocation: $listLocation) {
    id
    title
    createdAt
    updatedAt
    collection {
      id
    }
    notes {
      id
      title
      body
      createdAt
      updatedAt
    }
  }
}
    `;

export function useNotesListQuery(options: Omit<Urql.UseQueryArgs<NotesListQueryVariables>, 'query'>) {
  return Urql.useQuery<NotesListQuery, NotesListQueryVariables>({ query: NotesListDocument, ...options });
};
export const UserCollectionsDocument = gql`
    query userCollections($id: String!) {
  userCollections(id: $id) {
    id
    title
    visibility
    upvotes
    owner {
      id
      username
    }
    lists {
      id
      title
    }
  }
}
    `;

export function useUserCollectionsQuery(options: Omit<Urql.UseQueryArgs<UserCollectionsQueryVariables>, 'query'>) {
  return Urql.useQuery<UserCollectionsQuery, UserCollectionsQueryVariables>({ query: UserCollectionsDocument, ...options });
};
export const UserFollowersDocument = gql`
    query UserFollowers($userId: String!) {
  userFollowers(userId: $userId) {
    id
    username
    email
    collections {
      id
    }
  }
}
    `;

export function useUserFollowersQuery(options: Omit<Urql.UseQueryArgs<UserFollowersQueryVariables>, 'query'>) {
  return Urql.useQuery<UserFollowersQuery, UserFollowersQueryVariables>({ query: UserFollowersDocument, ...options });
};
export const UserFollowingDocument = gql`
    query UserFollowing($userId: String!) {
  userFollowing(userId: $userId) {
    id
    username
    email
    collections {
      id
    }
  }
}
    `;

export function useUserFollowingQuery(options: Omit<Urql.UseQueryArgs<UserFollowingQueryVariables>, 'query'>) {
  return Urql.useQuery<UserFollowingQuery, UserFollowingQueryVariables>({ query: UserFollowingDocument, ...options });
};
export const UserVotesDocument = gql`
    query UserVotes($userId: String!) {
  userVotes(userId: $userId) {
    id
    title
    visibility
    upvotes
    owner {
      id
      username
    }
    lists {
      id
      title
    }
  }
}
    `;

export function useUserVotesQuery(options: Omit<Urql.UseQueryArgs<UserVotesQueryVariables>, 'query'>) {
  return Urql.useQuery<UserVotesQuery, UserVotesQueryVariables>({ query: UserVotesDocument, ...options });
};
export const UserDocument = gql`
    query User($username: String!) {
  user(username: $username) {
    _id
    id
    email
    username
    following
    followers
    upvoted
  }
}
    `;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>) {
  return Urql.useQuery<UserQuery, UserQueryVariables>({ query: UserDocument, ...options });
};