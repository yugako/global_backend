const AppController = require('../controllers/controller');
/**
 * The App controller class where other controller inherits or
 * overrides pre defined and existing properties
 */
class WorkerController extends AppController {
	/**
	 * @param {Model} model The default model object
	 * for the controller. Will be required to create
	 * an instance of the controller
	 */
	constructor(model) {
		super(model);
	}
	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {function} next The callback to the next program handler
	 * @return {Object} res The response object
	 */
}

module.exports =  WorkerController;