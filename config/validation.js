const {check} = require('express-validator/check');

const Validation = {
	dishes: [
		check('title').isLength({ min: 3 })
			.withMessage('must be at least 3 chars long'),
		check('excerpt').isLength({ min: 5 })
			.withMessage('must be at least 5 chars long'),
		check('description').isLength({ min: 10 })
			.withMessage('must be at least 10 chars long'),
		check('ingradients').isLength({ min: 5 })
			.withMessage('must be at least 5 chars long'),
		check('price').isNumeric()
			.withMessage('must be a number value'),
		check('weight').isNumeric()
			.withMessage('must be a number value'),
	],
	auth: [
		check('name').isLength({min: 3})
			.withMessage('must be at least 3 chars long'),
		check('username').isLength({min: 3})
			.withMessage('must be at least 3 chars long'),
		check('password').isLength({min: 6})
			.withMessage('must be at least 6 chars long')
			.matches(/\d/).withMessage('must contain a number')
	],
}

module.exports = Validation;