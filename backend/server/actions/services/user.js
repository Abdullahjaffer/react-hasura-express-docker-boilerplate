import bcrypt from "bcrypt";
import { gql } from "graphql-request";
import { queryHasura } from "../../utils/queryHasura.js";

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
				$role: role_enum = editor
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
