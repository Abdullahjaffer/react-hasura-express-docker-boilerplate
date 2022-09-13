import { getUserById } from "../../../services/user.js";
import {
	AuthBearer,
	AuthorizationHeader,
	HASURA_ROLE_ANONYMOUS,
	XHasuraRole,
	XHasuraUserID,
} from "../../../utils/constants/auth.js";
import { verifyToken } from "../../../utils/jwt.js";

async function verifyController(req, res) {
	const start = new Date();
	const token = req.get(AuthorizationHeader);
	const anonymous = {
		[XHasuraRole]: HASURA_ROLE_ANONYMOUS,
	};

	// const childLogger = logger.child({
	// 	type: "auth",
	// });

	// TODO: verify token
	if (!token) {
		// childLogger.info("authorization header is empty", {
		// 	request_headers: env.DEBUG ? req.headers : {},
		// 	session_variables: anonymous,
		// 	http_code: 200,
		// 	latency: new Date().getTime() - start.getTime(),
		// });

		return res.json(anonymous);
	}

	const parts = token.split(" ");

	try {
		if (parts.length < 2 || parts[0] !== AuthBearer) {
			// childLogger.warn("invalid authorization token", {
			// 	request_headers: req.headers,
			// 	session_variables: anonymous,
			// 	http_code: 200,
			// 	latency: new Date().getTime() - start.getTime(),
			// });

			return res.json(anonymous);
		}

		const decodedToken = await verifyToken(parts[1]);

		const user = await getUserById(decodedToken.user.id);

		if (!user) {
			// childLogger.warn("user is not found or deleted", {
			// 	request_headers: req.headers,
			// 	session_variables: anonymous,
			// 	http_code: 200,
			// 	latency: new Date().getTime() - start.getTime(),
			// });

			return res.json(anonymous);
		}
		const jsonData = {
			[XHasuraUserID]: user.id,
			[XHasuraRole]: user.role,
		};

		// childLogger.info("finish authentication", {
		// 	// request_headers: env.DEBUG ? req.headers : {},
		// 	// session_variables: jsonData,
		// 	// http_code: 200,
		// 	// latency: new Date().getTime() - start.getTime(),
		// });

		console.log(jsonData);

		return res.json(jsonData);
	} catch (err) {
		console.log(err);
		// childLogger.error("authenticated failure", {
		// 	request_headers: req.headers,
		// 	session_variables: anonymous,
		// 	http_code: 200,
		// 	latency: new Date().getTime() - start.getTime(),
		// 	error: {
		// 		message: err.message,
		// 		...err,
		// 	},
		// });

		return res.json(anonymous);
	}
}

export default verifyController;
