const express = require('express');
const shopController = require('../controllers/shop');
const router = express.Router();
const isAuthenticated=require('../middleware/is-auth');
 router.get('/shop', shopController.getIndex);  // Use getProducts method from productsController
 router.get('/products',shopController.showproducts);
router.get('/products/:productID',shopController.getProduct);
 router.get('/cart',isAuthenticated,shopController.getcart);  
 router.post('/cart',isAuthenticated,shopController.postcart); // Use getProducts method from productsController
// router.get('/cheeckout',shopController.getcheeckout);
 router.post('/cart-delete-item',isAuthenticated,shopController.postDeleteCart)
 router.post('/order-now',isAuthenticated,shopController.postorder);
 router.get('/orders',isAuthenticated,shopController.getOrder);
 
module.exports = router;
