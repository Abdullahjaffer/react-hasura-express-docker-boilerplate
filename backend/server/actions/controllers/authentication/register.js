import { createNewUser, getUser } from "../../../services/user.js";
import { HASURA_ROLE_USER } from "../../../utils/constants/auth.js";
import hasuraError from "../../../utils/hasuraError.js";
import { generateJWT } from "../../../utils/jwt.js";

async function userRegisterController(req, res) {
	const { email, password, name } = req.body;

	const doesUserExist = await getUser(email).then(
		({ users }) => users.length !== 0
	);

	if (!doesUserExist) {
		const {
			insert_users_one: { role, ...user },
		} = await createNewUser(email, name, password, HASURA_ROLE_USER);
		res.send({
			accessToken: await generateJWT(user.id),
		});
	} else {
		return hasuraError(res, "User already exists");
	}
}

export default userRegisterController;
