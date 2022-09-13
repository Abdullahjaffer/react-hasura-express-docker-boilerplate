import bcrypt from "bcrypt";
import { getUser } from "../../../services/user.js";
import hasuraError from "../../../utils/hasuraError.js";
import { generateJWT } from "../../../utils/jwt.js";

async function userLoginController(req, res) {
	const { email, password } = req.body;

	const { users } = await getUser(email.toLowerCase());

	if (users && users.length) {
		const user = users[0];
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (passwordMatch) {
			return res.send({
				accessToken: await generateJWT(user.id),
			});
		} else {
			return hasuraError(res, "Email or password do not match");
		}
	} else {
		return hasuraError(res, "User does not exist.");
	}
}

export default userLoginController;
