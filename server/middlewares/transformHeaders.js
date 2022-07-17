import _ from "lodash";

function transformHeaders(req, res, next) {
	req.header = _.get(req, "body.session_variables");
	next();
}

export default transformHeaders;
