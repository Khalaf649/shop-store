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
  const product = new Product(
      null,
      req.body.title,
      req.body.price,
      req.body.imageUrl,
      req.body.description
  );

  console.log('New product:', product);

  product.save()
      .then((data) => {
          console.log('Product saved:', data);
          res.redirect('/shop');
      })
      .catch((err) => {
          console.error('Error saving product:', err);
          res.status(500).send('Failed to save product');
      });
};

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
  Product.fetch().then((data)=>{
    res.render('admin/product-list', {
      prods: data,
      pageTitle: "Admin products",
      path: "/admin/products"
    });
  }).catch((err)=>{
    if(err)
      console.log(err);
  })

    
 
}
exports.postDeleteProduct=(req,res,next)=>{
  
  const id=req.body.productId;
  console.log(id);
  Product.DeleteByid(id);
 

  res.redirect('/shop');
}