import { ApolloClient, InMemoryCache } from '@apollo/client';

import { HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getTokenFromSession } from './utils/shared';

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getTokenFromSession();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = new HttpLink({
  uri: process.env.UMI_APP_GRAPHQL_QUERY_PATH,
});

const wsLink = new WebSocketLink({
  uri: process.env.UMI_APP_GRAPHQL_WS_PATH as string,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        authorization: `Bearer ${getTokenFromSession()}`,
      },
    },
  },
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink),
);

const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default apolloClient;
