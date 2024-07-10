const path = require('path');
const express = require('express');
const router = express.Router();
const adminContollers = require('../controllers/admin');
const { Module } = require('module');
const isAuthenticated=require('../middleware/is-auth');

 router.get('/addproduct',isAuthenticated, adminContollers.getaddproduct);
 router.get('/Edit-Product/:productId',isAuthenticated, adminContollers.geteditproduct);
 router.post('/addproduct',isAuthenticated, adminContollers.postaddproduct);
 router.get('/products',isAuthenticated, adminContollers.getproducts);
 router.post('/Edit-Product',isAuthenticated, adminContollers.PostEditProduct);
 router.post('/Delete-Product', isAuthenticated,adminContollers.postDeleteProduct)
module.exports = router;

