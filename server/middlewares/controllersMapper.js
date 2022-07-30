import userLoginController from "../actions/controllers/authentication/login.js";
import userRegisterController from "../actions/controllers/authentication/register.js";
import ACTION_NAMES from "../constants/actionNames.js";
import hasuraError from "../utils/hasuraError.js";

const constrollersMap = {
	[ACTION_NAMES.AUTH_REGISTER_USER]: userRegisterController,
	[ACTION_NAMES.AUTH_REGISTER_LOGIN]: userLoginController,
};

function constrollersMapper(req, res) {
	let controller = constrollersMap[req.actionType];
	if (controller) {
		return controller(req, res);
	}

	return hasuraError(res, ACTION_NOT_FOUND);
}

export default constrollersMapper;
