import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";

const isServer = typeof window === "undefined";
const Cache =
  typeof __INITIAL_STATE__ === "undefined" ? {} : window.__INITIAL_STATE__;

const createClient = () =>
  new ApolloClient({
    // ssrMode: true,
    link: createHttpLink({
      uri: "http://localhost:3777/api/graphql",
      // credentials: "same-origin",
      fetch,
    }),
    cache: isServer
      ? new InMemoryCache()
      : new InMemoryCache().restore(Cache)
  });

export default createClient;
