import _ from "lodash";

function transformBody(req, res, next) {
	req.body = _.get(req, "body.input");
	next();
}

export default transformBody;
