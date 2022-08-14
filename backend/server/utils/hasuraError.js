const hasuraError = (res, message, details) => {
	return res.status(400).json({
		message: message,
		extensions: details,
	});
};

export default hasuraError;
