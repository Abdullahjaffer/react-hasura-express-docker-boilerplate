import _ from "lodash";
import ACTION_NAMES from "../constants/actionNames.js";
import hasuraError from "../utils/hasuraError.js";
import { userRegisterValidation } from "../validations/authentication.js";

const validationsMap = {
	[ACTION_NAMES.AUTH_REGISTER_USER]: userRegisterValidation,
};

function validationsMapper(req, res, next) {
	let validationSchema = validationsMap[req.actionType];
	if (validationSchema) {
		if (validationSchema.body) {
			let { error } = validationSchema.body.validate(_.get(req, "body"), {
				abortEarly: false,
			});
			if (error) {
				return hasuraError(res, "Validation Error", error.details);
			}
		}
		if (validationSchema.params) {
			let { error } = validationSchema.params.validate(_.get(req, "params"), {
				abortEarly: false,
			});
			if (error) {
				return hasuraError(res, "Validation Error", error.details);
			}
		}
		next();
	} else {
		next();
	}
}

export default validationsMapper;
