import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";

const isServer = typeof window === "undefined";

const createClient = () =>
  new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: "http://localhost:3777/api/graphql",
      // credentials: "same-origin",
      fetch,
    }),
    cache: isServer
      ? new InMemoryCache()
      : new InMemoryCache().restore(window.__INITIAL_STATE__ || {}),
  });

export default createClient;
