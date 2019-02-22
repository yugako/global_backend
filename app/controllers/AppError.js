class AppError extends Error {
	constructor (err) {
		if (!err) {
			this.message = 'Object not found!';
			this.code = 404;
		}
		super(err);
		this.err = err;
		this.message = '';
		this.code = '';
	}

	report() {
		if (this.err.kind === 'ObjectId' || err.name === 'NotFound' ) {
			this.message = 'Your object is not found';
			this.code = 404;
		} else {
			this.message = 'Internal server error';
			this.code = 500;
		}
		return {
			message: this.message,
			code: this.code
		}
	}
}

module.exports = AppError;