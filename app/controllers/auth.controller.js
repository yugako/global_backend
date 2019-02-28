const AppController = require('../controllers/controller');
const passport = require('passport');

class AuthController extends AppController {
	constructor(model) {
		super(model);
		this.register = this.register.bind(this);
	}
	
	logout (req, res) {
	  req.logout();
	  res.send('/');
	}

	login (req, res) {
		passport.authenticate('local')(req, res, function () {
		    res.send({
		    	username: req.user.username,
		    	name: req.user.name,
		    	role: req.body.role, 	
			})
		})
	}
	

	register(req, res) {
		const errors = validationResult(req);
	  	if (!errors.isEmpty()) {
	    	return res.status(422).json({ errors: errors.array() });
	 	}
		let obj = req.body;

	  	this._model.register(new this._model(obj), obj.password, function(err, user) {
	    	if (err) {
	      		res.send(err)
	    	}

		    passport.authenticate('local')(req, res, function () {
		      	res.send('Registration success');
		    });
	  	});
	}
}

module.exports =  AuthController;