class AppError extends Error {
	constructor(code = 'Generic', status = 500, ...params) {
		super(...params);

		this.code = code;
		this.status = status;
	}
}

module.exports = AppError;