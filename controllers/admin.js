const Product = require('../models/products');
const path = require('path');
const fs = require('fs');

exports.getaddproduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/addproduct',
   
  });
}
exports.postaddproduct = (req, res, next) => {
  x = new Product(req.body.title, req.body.price, req.body.imageUrl, req.body.description);
  console.log(x);
  x.save();
  res.redirect('/shop');
}
exports.geteditproduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/addproduct',
   
  });
}
exports.getproducts = (req, res, next) => {
  Product.fetch(arr => {
    res.render('admin/product-list', {
      prods: arr,
      pageTitle: "Admin products",
      path: "/admin/products"
    });
  });
}