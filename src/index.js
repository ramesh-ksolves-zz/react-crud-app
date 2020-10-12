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
import { Mutation } from 'react-apollo'
import gql from "graphql-tag"

Amplify.configure(awsExports);

const url = "https://5ys2fe6n7rc75mpkiufly5yzqe.appsync-api.us-east-1.amazonaws.com/graphql";
const region = "us-east-1";
const auth = {
  type: "API_KEY",
  apiKey: "da2-zlo55nr3wfh5jppefmyjku5zji"
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
