const Product = require('../models/products');
const path = require('path');
const fs = require('fs');

exports.getaddproduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/addproduct',
    editing:false
   
  });
}
exports.PostEditProduct=(req,res,next)=>{

  const productID=req.body.productID;
  const producttitle=req.body.title;
  const productprice=req.body.price;
  const productDescribtion=req.body.description;
  const productimage=req.body.imageUrl;
  const newProduct=new Product(productID,producttitle,productprice,productimage,productDescribtion);
  newProduct.save();
  res.redirect('/shop');

}
exports.postaddproduct = (req, res, next) => {
  x = new Product(null,req.body.title, req.body.price, req.body.imageUrl, req.body.description);
  //console.log("khalaf");
  x.save();
  console.log(x);
  res.redirect('/shop');
}
exports.geteditproduct = (req, res, next) => {
  const productId=req.params.productId;// dynamic segment
  const EditMode=req.query.edit // key parameter
  if(EditMode==="false")
  {
    return res.redirect('/shop');
  }
  Product.FindById(productId,(product)=>{
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/Edit-Product',
      editing:true,
      product:product
     
    });
  })
  
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
exports.postDeleteProduct=(req,res,next)=>{
  
  const id=req.body.productId;
  Product.DeleteByid(id);
 

  res.redirect('/shop');
}