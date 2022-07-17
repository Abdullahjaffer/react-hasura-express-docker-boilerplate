import userLoginController from "../actions/controllers/authentication/login.js";
import userRegisterController from "../actions/controllers/authentication/register.js";
import ACTION_NAMES from "../constants/actionNames.js";

const constrollersMap = {
	[ACTION_NAMES.AUTH_REGISTER_USER]: userRegisterController,
	[ACTION_NAMES.AUTH_REGISTER_LOGIN]: userLoginController,
};

function constrollersMapper(req, res) {
	console.log("in conroller mapper");
	let controller = constrollersMap(req.actionType);
	if (controller) {
		return controller(req, res);
	}
	res.send({
		message: "Action not found",
	});
}

export default constrollersMapper;
