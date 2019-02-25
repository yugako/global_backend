const express = require('express');
const router = express.Router();


const OrderModel = require('../models/order.model.js');

const OrderController = require('../controllers/order.controller.js');

const orderCtrl = new OrderController(OrderModel);

/**
 * @swagger
 * definition:
 *   Orders:
 *     properties:
 *       title:
 *         type: string
 *       number:
 *         type: number
 *       price:
 *         type: string
 *       action:
 *         type: string
 *       status:
 *         type: string
 *       worker: 
 *         type: string
 */

 /**
  * @swagger
  * /orders:
  *   get:
  *     tags:
  *       - Orders
  *     description: Returns all orders
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: An array of users
  */
router.get('/orders', orderCtrl.findAll);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     tags:
 *       - Orders
 *     description: Returns single order
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: order's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: An object of order
 *       404:
 *         description: Object not found 
 *       
 */
router.get('/orders/:itemId', orderCtrl.findOne);

 /**
  * @swagger
  * /orders:
  *   post:
  *     tags:
  *       - Orders
  *     description: Creates a new order
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: title
  *         description: Order's name
  *         in: formData
  *         required: true
  *         type: string
  *       - name: number
  *         description: Order number
  *         in: formData
  *         required: true
  *         type: number
  *       - name: price
  *         description: Order's price
  *         in: formData
  *         required: true
  *         type: String
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
  *       - name: action
  *         description: Order worker
  *         in: formData
  *         required: false
  *         type: string	
  *     responses:
  *       200:
  *         description: Successfully created
  *       500:
  *         description: Internal server error
  */
router.post('/orders', orderCtrl.create);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     tags:
 *       - Orders
 *     description: Update an order
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Order's id
 *         in: path
 *         required: true
 *         type: string
 *       - name: title
 *         description: Order's name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: number
 *         description: Order number
 *         in: formData
 *         required: true
 *         type: number
 *       - name: price
 *         description: Order's price
 *         in: formData
 *         required: true
 *         type: String
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
 *       - name: action
 *         description: Order worker
 *         in: formData
 *         required: false
 *         type: string	
 *     responses:
 *       200:
 *         description: Successfully created
 *       500:
 *         description: Internal server error
 */
router.put('/orders/:itemId', orderCtrl.update);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     tags:
 *       - Orders
 *     description: Deletes a single order
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: order's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Object not found
 */
router.delete('/orders/:itemId', orderCtrl.delete);


module.exports = router;