import { GraphQLClient } from "graphql-request";

export const queryHasura = new GraphQLClient(
	"http://graphql-engine:8080/v1/graphql",
	{
		headers: {
			"x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
		},
	}
);
