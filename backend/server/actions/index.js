import express from "express";
import constrollersMapper from "../middlewares/controllersMapper.js";
import transformActionType from "../middlewares/transformActionType.js";
import transformBody from "../middlewares/transformBody.js";
import transformHeaders from "../middlewares/transformHeaders.js";
import validationsMapper from "../middlewares/validationsMapper.js";

const router = express.Router();

const middlewares = [
	transformActionType,
	transformHeaders,
	transformBody,
	validationsMapper,
	constrollersMapper,
];

router.use("*", ...middlewares);

export default router;
