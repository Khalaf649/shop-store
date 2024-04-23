const express = require('express');
const shopController = require('../controllers/shop');
const router = express.Router();

router.get('/shop', shopController.getIndex);  // Use getProducts method from productsController
router.get('/products',shopController.showproducts);
router.get('/cart',shopController.getcart);  // Use getProducts method from productsController
router.get('/cheeckout',shopController.getcheeckout);
module.exports = router;
