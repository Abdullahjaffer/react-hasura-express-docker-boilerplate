import CONSTANTS from "../../../utils/constants/index.js";
import hasuraError from "../../../utils/hasuraError.js";
import { generateJWT } from "../../../utils/jwt.js";
import { createNewUser, getUser } from "../../services/user.js";

async function userRegisterController(req, res) {
	const { email, password, name } = req.body;

	const doesUserExist = await getUser(email).then(
		({ users }) => users.length !== 0
	);

	if (!doesUserExist) {
		const {
			insert_users_one: { role, ...user },
		} = await createNewUser(email, name, password, CONSTANTS.DEFAULT_ROLE);
		res.send({
			accessToken: generateJWT({
				defaultRole: role,
				allowedRoles: [role],
				otherClaims: {
					"X-Hasura-User-Id": user.id,
					user: {
						email: user.email,
						name: user.name,
						role: user.role,
					},
				},
			}),
		});
	} else {
		return hasuraError(res, "User already exists");
	}
}

export default userRegisterController;
