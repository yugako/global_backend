const express = require('express');
const router = express.Router();

const {check} = require('express-validator/check');

const AdminModel = require('../models/admin.model.js');

const AdminController = require('../controllers/admin.controller.js');

const adminCtrl = new AdminController(AdminModel);

router.get('/admins', adminCtrl.findAll);

router.get('/admins/:itemId', adminCtrl.findOne);

router.post('/admins', [
		check('name').isLength({min: 3}),
		check('password').isLength({min: 6})
			.withMessage('Must be at least 6 chars long')
			.matches(/\d/).withMessage('Must contain a number')
	], adminCtrl.create);

router.put('/admins/:itemId', [
		check('name').isLength({min: 3}),
		check('password').isLength({min: 6})
	], adminCtrl.update);

router.delete('/admins/:itemId', adminCtrl.delete);


module.exports = router;