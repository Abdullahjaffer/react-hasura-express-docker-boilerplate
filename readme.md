# What is this?
Hasura is a backend graphql resolver that helps creating backends fast and optimized out of the box.

Umijs provides scaffoldings for enterprise level applications

This repo contains the basic boilerplate setup that needs to be done in order to start working with hasura on local or self premises.

It has 4 parts.

#### Frontend (React.js)
We are using react.js for frontend but backend alone can work with any frontend technology which supports rest or graphql

#### Hasura Console
We need this to start development and create migrations and keep a record. You can also use an existing database. Checkout the readme in the **hasura** folder.
In short this folder contains migrations and all the metadata. Hasura console is only used for development. The real communication is always from the hasura service described below. Check out documentation for more.

#### Express Server
This contains a server that handles custom actions and events from the hasura service. All the custom thing happening in our app would occur here.

#### Hasura graphql service 
This service is described in docker and is used with all the components described above. All the communication should be done from here. Custom actions should also pass on from there. Check the hasura documentation to do that.