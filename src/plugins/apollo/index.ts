import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem("token"),
    },
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    Profile: {
      fields: {
        skills: {
          keyArgs: false,
          merge(existing, incoming) {
            return incoming;
          },
        },
        languages: {
          keyArgs: false,
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default apolloClient;
