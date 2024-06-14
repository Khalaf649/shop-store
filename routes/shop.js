const express = require('express');
const shopController = require('../controllers/shop');
const router = express.Router();

 router.get('/shop', shopController.getIndex);  // Use getProducts method from productsController
 router.get('/products',shopController.showproducts);
router.get('/products/:productID',shopController.getProduct);
 router.get('/cart',shopController.getcart);  
 router.post('/cart',shopController.postcart); // Use getProducts method from productsController
// router.get('/cheeckout',shopController.getcheeckout);
 router.post('/cart-delete-item',shopController.postDeleteCart)
 router.post('/order-now',shopController.postorder);
 router.get('/orders',shopController.getOrder);
module.exports = router;
