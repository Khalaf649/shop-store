const path = require('path');
const express = require('express');
const router = express.Router();
const adminContollers=require('../controllers/admin');
const { Module } = require('module');

// /admin/add-product => GET
router.get('/addproduct',adminContollers.getaddproduct );

// /admin/add-product => POST
router.post('/addproduct',adminContollers.postaddproduct);
router.get('/products',adminContollers.getproducts);
module.exports = router;

