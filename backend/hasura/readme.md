# Development
In order to use hasura, create migrations and metadata. ONLY USE THIS FOR DEVELOPMENT

- Install hasura-cli with
```sh
npm i -g hasura-cli
```
- Always pull and apply migrations before developing
```sh
hasura migrate apply
```

- start development by
```sh
hasura console --envfile ../.env
```
> Note: this loads the env vars from the .env file in the root


##### use {{HASURA_GRAPHQL_ACTIONS_HANDLER_WEBHOOK_BASEURL}} as base url for actions

### Applying changes to Remote (Can be staging and production server)

#### Applying migations
```sh
hasura migrate apply --endpoint <graphql-engine-endpoint> --admin-secret <admin-secret> --database-name <database-name>
```

#### Applying metadata
```sh
hasura metadata apply --endpoint <graphql-engine-endpoint> --admin-secret <admin-secret>
```

## Don't use this if you have a new database

### Create initial migration
> Note: We need to run this initial process in the start. Once only.


#### Initialize
```sh
hasura migrate create init --sql-from-server 
```

#### Apply initial migration
```sh
hasura migrate apply --version 1637934675570 --skip-execution
```
> Note: `1637934675570` Note down the directory name, which would look something like this 1627564572630_init. Just copy the version number without the _init parts of the name.

#### Pull metadata
```sh
hasura metadata export
```

#### Apply metadata
```sh
hasura metadata apply
```

