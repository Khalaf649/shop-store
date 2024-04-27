const Product = require('../models/products');
const path = require('path');
const fs = require('fs');
const Cart=require('../models/cart');

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
  Cart.addProduct(id,prodx.price)
})
res.redirect('/cart');

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
  
exports.getcart=(req,res,next)=>{
  Cart.fetch((cart)=>{
    Product.fetch((products)=>{
      const ans=[];
       for(var i=0;i<cart.prods.length;i++)
       {
            for(var j=0;j<products.length;j++)
            {
              if(cart.prods[i].id===products[j].id)
              {
                ans.push(
                  {
                    product:products[j],
                    qty:cart.prods[i].qty,
                    price:cart.prods[i].TotalPrice

                  }
                )
              }
            }
       }
       res.render('shop/cart',
      {
        pageTitle :"Your Cart",
        path:"/cart",
        products :ans
      });
    })
  })
}

exports.postDeleteCart=(req,res,next)=>{
  Cart.DeleteByid(req.body.productId);
  res.redirect('/shop');
}

