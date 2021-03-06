import { ApolloClient } from "apollo-client";
// import { HttpLink } from 'apollo-link-http';
import { createUploadLink } from "apollo-upload-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";

// const httpLink = new HttpLink({
//   uri: 'http://localhost:4000/',
// });

const link = createUploadLink({
  uri: "http://localhost:4000/"
});

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

export default apolloProvider;
