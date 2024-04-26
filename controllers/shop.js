const Product = require('../models/products');
const path = require('path');
const fs = require('fs');
const cart=require('../models/cart');

exports.showproducts = (req, res, next) => {
  Product.fetch(arr => {
    res.render('shop/product-list', {
      prods: arr,
      pageTitle: "All Products",
      path: "/products"
    });
  });
  

}
exports.getIndex = (req, res, next) => {
  Product.fetch(arr => {
    res.render('shop/index', {
      prods: arr,
      pageTitle: "shop",
      path: "/shop"
    });
  });
}
exports.postcart=(req,res,next)=>{
const id=req.body.productId;
Product.FindById(id,(prodx)=>{
  cart.addProduct(id,prodx.price)
})
res.redirect('/cart');

}
exports.getcart = (req, res, next) => {
  res.render('shop/cart',
    {
      path: '/cart',
      pageTitle: 'Your cart'
    });
}
exports.getcheeckout = (req, res, next) => {
  res.render('shop/cheeckout',
    {
      path: '/cheeckout',
      pageTitle: "cheeckout"
    });
}
exports.getProduct = (req, res, next) => {
  const productID = req.params.productID;
  
   
 Product.FindById(productID,(prodx)=>{
res.render('shop/product-detail',
{
  pageTitle:"Deatils",
  product:prodx,
  path:"/products"
});

 })
  
 

}
  




