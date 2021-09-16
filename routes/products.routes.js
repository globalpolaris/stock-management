const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controllers');

router
  .route('/api/products')
  .get(productsController.getAllProducts)
  .post(productsController.postProduct);

router.get('/api/products/:id', productsController.getAllProducts);
router.put('/api/products/:id', productsController.updateProductController);
router.delete('/api/products/:id', productsController.deleteProduct);

module.exports = router;
