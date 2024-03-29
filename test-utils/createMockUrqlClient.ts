import { DocumentNode } from "graphql";
import {
  AnyVariables,
  GraphQLRequest,
  Operation,
  OperationContext,
  OperationType,
  TypedDocumentNode,
} from "urql";

export type MockClient<Variables extends AnyVariables, Response> = {
  operations$: jest.Mock;
  reexecuteOperation: jest.Mock;
  subscribeToDebugTarget?: jest.Mock;
  url: jest.Mock;
  fetch?: jest.Mock;
  fetchOptions?: jest.Mock;
  suspense: jest.Mock;
  requestPolicy: jest.Mock;
  preferGetMethod: jest.Mock;
  maskTypename: jest.Mock;
  createOperationContext(
    opts?: Partial<OperationContext> | undefined
  ): jest.Mock;
  createRequestOperation<Data = any, Variables extends AnyVariables = object>(
    kind: OperationType,
    request: GraphQLRequest<Data, Variables>,
    opts?: Partial<OperationContext> | undefined
  ): jest.Mock;
  executeRequestOperation<Data = any, Variables extends AnyVariables = object>(
    operation: Operation<Data, Variables>
  ): jest.Mock;
  query<Data = any, Variables extends object = {}>(
    query: DocumentNode | TypedDocumentNode<Data, Variables> | string,
    variables?: Variables,
    context?: Partial<OperationContext>
  ): jest.Mock;
  subscription<Data = any, Variables extends object = {}>(
    query: DocumentNode | TypedDocumentNode<Data, Variables> | string,
    variables?: Variables,
    context?: Partial<OperationContext>
  ): jest.Mock;
  mutation<Data = any, Variables extends object = {}>(
    query: DocumentNode | TypedDocumentNode<Data, Variables> | string,
    variables?: Variables,
    context?: Partial<OperationContext>
  ): jest.Mock;

  readQuery<Data = any, Variables extends object = {}>(
    query: DocumentNode | TypedDocumentNode<Data, Variables> | string,
    variables?: Variables,
    context?: Partial<OperationContext>
  ): jest.Mock;

  executeMutation: (query: {
    query: any;
    variables: any;
  }) => Response | undefined;
  executeQuery: (query: { query: any; variables: any }) => Response | undefined;
  executeSubscription: () => null;
};

export const createMockUrqlClient = <Variables extends AnyVariables, Response>(
  functions: Partial<MockClient<Variables, Response>>
): MockClient<Variables, Response> => {
  return {
    operations$: jest.fn(),
    reexecuteOperation: jest.fn(),
    subscribeToDebugTarget: jest.fn(),
    url: jest.fn(),
    fetch: jest.fn(),
    fetchOptions: jest.fn(),
    suspense: jest.fn(),
    requestPolicy: jest.fn(),
    preferGetMethod: jest.fn(),
    maskTypename: jest.fn(),
    createOperationContext: jest.fn(),
    createRequestOperation: jest.fn(),
    executeRequestOperation: jest.fn(),
    query: jest.fn(),
    subscription: jest.fn(),
    mutation: jest.fn(),
    readQuery: jest.fn(),
    executeMutation: jest.fn(),
    executeQuery: jest.fn(),
    executeSubscription: jest.fn(),
    ...functions,
  };
};
