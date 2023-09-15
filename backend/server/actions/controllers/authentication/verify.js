import { getUserById } from "../../../services/user.js";
import {
	AuthBearer,
	AuthorizationHeader,
	HASURA_ROLE_ANONYMOUS,
	XHasuraRole,
	XHasuraUserID
} from "../../../utils/constants/auth.js";
import { verifyToken } from "../../../utils/jwt.js";

async function verifyController(req, res) {
	const start = new Date();
	const token = req.get(AuthorizationHeader);
	const anonymous = {
		[XHasuraRole]: HASURA_ROLE_ANONYMOUS,
	};
	if (!token) {
		return res.json(anonymous);
	}

	const parts = token.split(" ");

	try {
		if (parts.length < 2 || parts[0] !== AuthBearer) {
			return res.json(anonymous);
		}

		const decodedToken = await verifyToken(parts[1]);

		const user = await getUserById(decodedToken.user.id);

		if (!user) {
			return res.json(anonymous);
		}
		const jsonData = {
			[XHasuraUserID]: user.id,
			[XHasuraRole]: user.role,
		};
		console.log(jsonData);

		return res.json(jsonData);
	} catch (err) {
		console.log(err);
		return res.json(anonymous);
	}
}

export default verifyController;
