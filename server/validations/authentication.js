import Joi from "joi";

const userRegisterValidation = {
	body: Joi.object().keys({
		name: Joi.string().min(3).max(120).required(),
		email: Joi.string().min(3).max(120).required().email(),
		password: Joi.string().min(6).max(120).required(),
	}),
};
export { userRegisterValidation };
