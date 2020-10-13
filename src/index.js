import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloLink } from 'apollo-link';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createHttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import gql from "graphql-tag";
import dotenv from 'dotenv';

Amplify.configure(awsExports);

const url = process.env.REACT_APP_APPSYNC_GRAPHQLENDPOINT;
const region = process.env.REACT_APP_PROJECT_REGION;
const auth = {
  type: process.env.REACT_APP_APPSYNC_AUTHENTICATIONTYPE,
  apiKey: process.env.REACT_APP_APPSYNC_APIKEY
};
const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createHttpLink({ uri: url })
]);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
