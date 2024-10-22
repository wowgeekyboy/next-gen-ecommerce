const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// ... other routes

router.put('/:id/inventory', productController.updateProductInventory);

module.exports = router;