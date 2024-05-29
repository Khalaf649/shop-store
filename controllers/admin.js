const sequelize = require('sequelize');
const Product =require('../models/product');


exports.getaddproduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/addproduct',
    editing:false
   
  });
}
exports.PostEditProduct=async(req,res,next)=>{

  const productID=req.body.productID;
  const producttitle=req.body.title;
  const productprice=req.body.price;
  const productDescribtion=req.body.description;
  const productimage=req.body.imageUrl;
  const newProduct=new Product(producttitle,productprice,productimage,productDescribtion,productID,req.user._id);
  await newProduct.save();
  res.redirect('/shop');

}
exports.postaddproduct = async(req, res, next) => {
  // Assuming req.user represents the currently authenticated user
  const product=new Product(req.body.title,req.body.price,req.body.imageUrl,req.body.description,null,req.user._id);
  await product.save()
  res.redirect('/shop');

};


exports.geteditproduct = async(req, res, next) => {
  const productId = req.params.productId; // dynamic segment
  const editMode = req.query.edit; // key parameter
  console.log(productId);

  if (editMode === "false") {
      return res.redirect('/shop');
  }

  const product=await Product.fetchOne(productId);
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/Edit-Product',
    editing: true,
    product: product
});
  // Assuming you've set up the association properly, you can directly use include to get the product
  
};
exports.getproducts = async(req, res, next) => {
  const products=await  Product.fetchAll();
  res.render('admin/product-list', {
    prods: products,
    pageTitle: "Admin products",
    path: "/admin/products"
  });

 
    
 
}
exports.postDeleteProduct=async(req,res,next)=>{
  
  const id=req.body.productId;
  await Product.deleteById(id);
  res.redirect('/shop');
 

  
}