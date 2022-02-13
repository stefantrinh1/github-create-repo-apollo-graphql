import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import {
  ApolloClient,
  ApolloProvider,
  // HttpLink,
  InMemoryCache,
} from '@apollo/client';

const GITHUB_BASE_URL = 'https://api.github.com/graphql';

const githubToken = process.env.REACT_APP_GITHUB_API_TOKEN;

const client = new ApolloClient({
  uri: GITHUB_BASE_URL,
  cache: new InMemoryCache(),
  credentials: 'omit',
  headers: {
    authorization: `Bearer ${githubToken}`,
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
