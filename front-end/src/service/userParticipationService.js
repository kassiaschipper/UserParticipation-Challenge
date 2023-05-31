import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5001/', //'https://user-participation.herokuapp.com/',  
  cache: new InMemoryCache(),
});

export default client;
