const { ApolloClient, InMemoryCache } = require("@apollo/client");

export const client = new ApolloClient({
  uri: process.env.SERVER_BASE_URL,
  cache: new InMemoryCache(),
});
