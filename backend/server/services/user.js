import bcrypt from "bcrypt";
import { gql } from "graphql-request";
import { queryHasura } from "../utils/queryHasura.js";

export const getUserById = (id) =>
	queryHasura
		.request(
			gql`
				query MyQuery($id: uuid) {
					users(where: { id: { _eq: $id } }) {
						role
						name
						email
						id
					}
				}
			`,
			{
				id,
			}
		)
		.then(({ users }) => users[0]);

export const getUser = (email) =>
	queryHasura.request(
		gql`
			query MyQuery($email: String) {
				users(where: { email: { _eq: $email } }) {
					role
					name
					email
					id
					password
				}
			}
		`,
		{
			email,
		}
	);

export const createNewUser = async (email, name, password, role) =>
	queryHasura.request(
		gql`
			mutation MyMutation(
				$email: String!
				$name: String = ""
				$password: String = ""
				$role: role_enum
			) {
				insert_users_one(
					object: {
						email: $email
						name: $name
						password: $password
						role: $role
					}
				) {
					role
					name
					email
					id
				}
			}
		`,
		{
			email,
			name,
			password: await bcrypt.hash(password, 10),
			role,
		}
	);
