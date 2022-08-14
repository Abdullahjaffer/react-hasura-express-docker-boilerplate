import bcrypt from "bcrypt";
import hasuraError from "../../../utils/hasuraError.js";
import { generateJWT } from "../../../utils/jwt.js";
import { getUser } from "../../services/user.js";

async function userLoginController(req, res) {
	const { email, password } = req.body;

	const { users } = await getUser(email);

	if (users && users.length) {
		const user = users[0];
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (passwordMatch) {
			return res.send({
				accessToken: generateJWT({
					defaultRole: user.role,
					allowedRoles: [user.role],
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
			return hasuraError(res, "Email or password do not match");
		}
	} else {
		return hasuraError(res, "User does not exist.");
	}
}

export default userLoginController;
