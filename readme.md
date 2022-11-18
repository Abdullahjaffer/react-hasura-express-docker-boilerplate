## General
###### What is this?
Hasura is a backend graphql resolver that helps create backends fast and optimized out of the box.

Umijs provides scaffoldings for enterprise-level applications

This repo contains the basic boilerplate setup that needs to be done to start working with Hasura on local or self-premises.

It has 4 parts.

##### [Frontend (React.js)](frontend/README.md)
We are using react.js for the frontend but the backend alone can work with any frontend technology which supports rest or graphql

##### [Hasura Console](backend/hasura/readme.md)
We need this to start development and create migrations and keep a record. You can also use an existing database. Check out the readme in the **Hasura** folder.
In short, this folder contains migrations and all the metadata. Hasura console is only used for development. The real communication is always from the Hasura service described below. Check out the documentation for more.

##### [Express Server](backend/server/readme.md)
This contains a server that handles custom actions and events from the Hasura service. All the custom things happening in our app would occur here.

##### [Hasura graphql service](backend/readme.md)
This service is described in docker and is used with all the components described above. All the communication should be done from here. Custom actions should also pass on from there. Check the Hasura documentation to do that.

## Setup

Following packages should be installed first
- nodejs (version > 16)
- yarn
- docker-compose
- postgres
- hasura-cli

Run this after cloning
```bash
yarn
```
This installs husky for git precommit hooks at root of project.

Now, you can run the following command to setup both frontend and backend application. This also creates a .env file for backend
```bash
./scripts/setup.sh
```

## Development

Run the following command to start the backend server. This requires docker-compose to be installed.
```bash
./scripts/start-backend-dev.sh
```
`More development documents can be found in the backend and frontend folders.`

### Github

Please use [conventional-commit](https://www.conventionalcommits.org) message format for your pull-request and commit messages to have a clean commit history.

It should be look like: `feat: changed something` (optional: add scope for specific context i.e. `feat(feature-name): changed something`)

subject should start with an issue number if available like `feat: 0000 some work message`

```
<type>[optional scope]: <subject>

[optional body]

[optional footer(s)]
```

Legend:

- type: what type of change this commit contains
- scope: what item of code this commit is changing
- subject: a short description of the changes
- body (optional): a more in-depth description of the changes

Types:

- feat: A new feature
- fix: A bug fix
- wip: While working on a fix/feature
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug or adds a feature
- test: Adding missing tests
- chore: Changes to the build process or auxiliary tools and libraries such as documentation generation


## TODO

### Errors

- Still new

### Improvements

- Add project struture section (!important)
- Add testing section
- Add deployment section
- Add environment variable secions
- Add standard version package (!important)