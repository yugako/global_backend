const express = require('express');
const router = express.Router();

const Valid = require('../../config/validation');

const WorkerModel = require('../models/worker.model.js');

const Auth = require("../controllers/auth.controller.js");

const authWorkers = new Auth(WorkerModel);

/**
 * @swagger
 * definition:
 *   Users:
 *     properties:
 *       username:
 *         type: string
 *       name:
 *         type: string
 *       password:
 *         type: string
 *       role:
 *         type: string
 */

 /**
  * @swagger
  * /users:
  *   post:
  *     tags:
  *       - Users
  *     description: Creates a new user
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: name
  *         description: Full user's name
  *         in: formData
  *         required: true
  *         value: John Doe
  *         type: string
  *       - name: username
  *         description: 	Worker`s login
  *         in: formData
  *         required: true
  *         value: jodoe
  *         type: string
  *       - name: password
  *         description: Worker'`s password
  *         in: formData
  *         required: true
  *         value: jodo456
  *         type: string
  *       - name: role
  *         description: Worker'`s role
  *         in: formData
  *         required: false
  *         value: stuff
  *         type: string	
  *     responses:
  *       200:
  *         description: Successfully created
  *       500:
  *         description: Internal server error
  */
router.post('/users', Valid.auth, authWorkers.register);

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 */
router.get('/users', authWorkers.findAll);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns single users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: An object of user
 *       404:
 *         description: Object not found 
 *       
 */
router.get('/users/:itemId', authWorkers.findOne);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: 
 *      - Users
 *     description: Updates a single user
 *     produces: application/json
 *     parameters:
*       - name: id
*         description: Worker's id
*         in: path
*         required: true
*         type: string
*       - name: name
*         description: Full worker's name
*         in: formData
*         required: true
*         value: John Doe
*         type: string
*       - name: username
*         description: 	Worker's login
*         in: formData
*         required: true
*         value: jodoe
*         type: string
*       - name: password
*         description: Worker's password
*         in: formData
*         required: true
*         value: jodo456
*         type: string
*       - name: role
*         description: Worker's role
*         in: formData
*         required: false
*         value: stuff
*         type: string	
*     responses:
*       200:
*         description: Successfully updated
*       404:
*         description: Object not found
*/
router.put('/users/:itemId', Valid.auth, authWorkers.update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     description: Deletes a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Object not found
 */
router.delete('/users/:itemId', authWorkers.delete);

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Users
 *     description: login
 *     produces:
 *       - application/json
 *     parameters:
*       - name: name
*         description: Full user's name
*         in: formData
*         required: false
*         value: John Doe
*         type: string
*       - name: username
*         description: 	Worker`s login
*         in: formData
*         required: true
*         value: jodoe
*         type: string
*       - name: password
*         description: Worker'`s password
*         in: formData
*         required: true
*         value: jodo456
*         type: string
*       - name: role
*         description: Worker'`s role
*         in: formData
*         required: false
*         value: stuff
*         type: string	
*     responses:
*       200:
*         description: Successfully login
*       401:
*         description: Unauthorized
*       404:
*         description: Object not found 
 */
router.post('/login', authWorkers.login);

/**
 * @swagger
 * /logout:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully logout       
 */
router.get('/logout', authWorkers.logout);


module.exports = router;