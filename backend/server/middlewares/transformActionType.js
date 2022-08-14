import _ from "lodash";

function transformActionType(req, res, next) {
	req.actionType = _.get(req, "body.action.name");
	next();
}

export default transformActionType;
