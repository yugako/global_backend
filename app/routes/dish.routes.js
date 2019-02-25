const express = require('express');
const router = express.Router();

const Valid = require('../../config/validation');

const DishModel = require('../models/dish.model.js');

const DishController = require('../controllers/dish.controller.js');

const dishCtrl = new DishController(DishModel);

/**
 * @swagger
 * definition:
 *   Dishes:
 *     properties:
 *       title:
 *         type: string
 *       img:
 *         type: string
 *       quantity:
 *         type: number
 *       price:
 *         type: number
 *		 excerpt:
 *         type: string     
 */

/**
 * @swagger
 * /dishes:
 *   get:
 *     tags:
 *       - Dishes
 *     description: Returns all dishes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of dishes
 */
router.get('/dishes', dishCtrl.findAll);

/**
 * @swagger
 * /dishes/{id}:
 *   get:
 *     tags:
 *       - Dishes
 *     description: Returns single dish
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
 *         description: An object of dish
 *       404:
 *         description: Object not found 
 *       
 */
router.get('/dishes/:itemId', dishCtrl.findOne);

 /**
  * @swagger
  * /dishes:
  *   post:
  *     tags:
  *       - Dishes
  *     description: Creates a new dish
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: title
  *         description: Dish title
  *         in: formData
  *         required: true        
  *         type: string
  *       - name: img
  *         description: Dish img
  *         in: formData
  *         required: false
  *         type: string
  *       - name: quantity
  *         description: Dish quantity
  *         in: formData
  *         required: true
  *         value: 1
  *         type: number
  *       - name: price
  *         description: Dish price
  *         in: formData
  *         required: true
  *         type: number
  *       - name: excerpt
  *         description: Dish excerpt
  *         in: formData
  *         required: true        
  *         type: string
  *       - name: description
  *         description: Dish description
  *         in: formData
  *         required: true
  *         type: string
  *       - name: ingradients
  *         description: Dish ingradients
  *         in: formData
  *         required: true
  *         type: string
  *       - name: weight
  *         description: Dish weight
  *         in: formData
  *         required: true
  *         type: number
  *       - name: status
  *         description: Dish status
  *         in: formData
  *         required: true
  *         value: Unprocessed
  *         type: string
  *       - name: action
  *         description: Dish status
  *         in: formData
  *         value: Take in order
  *         required: true
  *         type: string				
  *     responses:
  *       200:
  *         description: Successfully created
  *       500:
  *         description: Internal server error
  */
router.post('/dishes', Valid.dishes, dishCtrl.create);

/**
 * @swagger
 * /dishes/{id}:
 *   put:
 *     tags: 
 *        - Dishes
 *     description: Updates a single dish
 *     produces: application/json
 *     parameters:
  *       - name: title
  *         description: Dish title
  *         in: formData
  *         required: true        
  *         type: string
  *       - name: img
  *         description: Dish img
  *         in: formData
  *         required: false
  *         type: string
  *       - name: quantity
  *         description: Dish quantity
  *         in: formData
  *         required: true
  *         value: 1
  *         type: number
  *       - name: price
  *         description: Dish price
  *         in: formData
  *         required: true
  *         type: number
  *       - name: excerpt
  *         description: Dish excerpt
  *         in: formData
  *         required: true        
  *         type: string
  *       - name: description
  *         description: Dish description
  *         in: formData
  *         required: true
  *         type: string
  *       - name: ingradients
  *         description: Dish ingradients
  *         in: formData
  *         required: true
  *         type: string
  *       - name: weight
  *         description: Dish weight
  *         in: formData
  *         required: true
  *         type: number
  *       - name: status
  *         description: Dish status
  *         in: formData
  *         required: true
  *         value: Unprocessed
  *         type: string
  *       - name: action
  *         description: Dish status
  *         in: formData
  *         value: Take in order
  *         required: true
  *         type: string				
  *     responses:
  *       200:
  *         description: Successfully updated
  *       404:
  *         description: Not found
  *       500:
  *         description: Internal server error
 */
router.put('/dishes/:itemId', Valid.dishes, dishCtrl.update);

/**
 * @swagger
 * /dishes/{id}:
 *   delete:
 *     tags:
 *       - Dishes
 *     description: Deletes a single dish
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: dish id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/dishes/:itemId', dishCtrl.delete);


module.exports = router;