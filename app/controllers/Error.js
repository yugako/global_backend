const _ = require('underscore');

class AppError extends Error {
	constructor (message, code, messages = null) {
		super(message);
		this._code = code;
		if (messages) {
			this._messages = messages;
		}
	}

	get code() {
		return this._code;
	}

	get messages() {
		return this._messages;
	}

	format() {
		let obj = {
			code: this._code,
			message: this.message
		};
		if (this.messages) {
			obj.messages = this.validateErrors(this._messages);
		}
		return obj;
	}

	validateErrors (error) {
		let errArray = [];
		if (!_.isEmpty(error)) {
			for (let prop in error) {
				if (error.hasOwnProperty(prop)) {
					_.forEach(error[prop], (errorMessage) => {
						errorsArray.push(errorMessage);
					});
				}
			}
		}
		return errorsArray;

	}
}

module.exports = AppError;