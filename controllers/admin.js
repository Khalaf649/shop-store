const Product = require('../models/products');
const path = require('path');
const fs = require('fs');

exports.getaddproduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/addproduct',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
}
exports.postaddproduct = (req, res, next) => {
  x = new Product(req.body.title, req.body.price, req.body.imageUrl, req.body.description);
  console.log(x);
  x.save();
  res.redirect('/shop');
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