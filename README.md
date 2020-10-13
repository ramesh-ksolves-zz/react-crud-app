# ReactJS Sample Application

This is the basic ReactJS sample application demonstrating how can we perform basic CRUD operations & reusable components by making use for following stack
- GraphQL
- AWS DynamoDB
- AWS Amplify
- React Apollo
- AWS AppSync

# Prerequisites to setup and run application locally
- Node.js v10.x or later
- npm v5.x or later
- git v2.14.1 or later

# How to deploy and run application on local
- Take pull of code from git hub
- Go to the directory `cd react-crud-app`
- run `npm install` (This step wil install all dependencies)
- add environment seeting give below to .env file in root
- run `npm start` 
- Now your web app will start running from local

# Environment settings to be done in .env file
REACT_APP_PROJECT_REGION=
REACT_APP_APPSYNC_GRAPHQLENDPOINT=
REACT_APP_APPSYNC_REGION=
REACT_APP_APPSYNC_AUTHENTICATIONTYPE=
REACT_APP_APPSYNC_APIKEY=
# Notes

Here in this app, I have demonstrated on how to connect to GraphQL using React Apollo Client as well as with AWS Amplify API to do GraphQL operations like Query, Mutation...
