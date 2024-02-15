const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');
const validateInput = require('../middleware/validateInput');

// Create a new record
router.post('/items', validateInput, itemsController.createItem);

// Get all records
router.get('/items', itemsController.getItems);

// Get a specific record by ID
router.get('/items/:id', itemsController.getItemById);

// Update a record by ID
router.put('/items/:id', validateInput, itemsController.updateItem);

// Delete a record by ID
router.delete('/items/:id', itemsController.deleteItem);

module.exports = router;
