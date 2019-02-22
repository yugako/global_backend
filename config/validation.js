const {check} = require('express-validator/check');

const Validation = {
	dishes: [
		check('title').isLength({ min: 3 }),
		check('price').isNumeric(),
		check('weight').isNumeric(),
	],
	auth: [
		check('name').isLength({min: 3}),
		check('password').isLength({min: 6})
			.withMessage('Must be at least 6 chars long')
			.matches(/\d/).withMessage('Must contain a number')
	],
}

module.exports = Validation;