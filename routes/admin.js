const path = require('path');
const express = require('express');
const router = express.Router();
const adminContollers = require('../controllers/admin');
const { Module } = require('module');


 router.get('/addproduct', adminContollers.getaddproduct);
 router.get('/Edit-Product/:productId', adminContollers.geteditproduct);
 router.post('/addproduct', adminContollers.postaddproduct);
 router.get('/products', adminContollers.getproducts);
 router.post('/Edit-Product', adminContollers.PostEditProduct);
 router.post('/Delete-Product', adminContollers.postDeleteProduct)
module.exports = router;

