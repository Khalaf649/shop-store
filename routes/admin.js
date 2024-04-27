const path = require('path');
const express = require('express');
const router = express.Router();
const adminContollers=require('../controllers/admin');
const { Module } = require('module');

// /admin/add-product => GET
router.get('/addproduct',adminContollers.getaddproduct );
router.get('/Edit-Product/:productId',adminContollers.geteditproduct );
// /admin/add-product => POST
router.post('/addproduct',adminContollers.postaddproduct);
router.get('/products',adminContollers.getproducts);
router.post('/Edit-Product',adminContollers.PostEditProduct);
router.post('/Delete-Product',adminContollers.postDeleteProduct)
module.exports = router;

