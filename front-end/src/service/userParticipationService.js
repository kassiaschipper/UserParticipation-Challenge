import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://user-participation.herokuapp.com/', //'http://localhost:5001/',  
  cache: new InMemoryCache(),
});

export default client;
