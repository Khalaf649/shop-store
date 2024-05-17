const sequelize = require('sequelize');
const Products =require('../models/product');


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
  const newProduct=new Product(productID,producttitle,productprice,productimage,productDescribtion);
  const product=await Product.findByPk(productID);
  product.title=producttitle;
  product.price=productprice;
  product.description=productDescribtion;
  product.imageUrl=productimage;
  await product.save();
  res.redirect('/shop');

}
exports.postaddproduct = (req, res, next) => {
  // Assuming req.user represents the currently authenticated user
  const user=req.user
  user.createProduct({
    title: req.body.title,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    description: req.body.description
  })
  .then(() => {
    // Product created successfully, redirect to shop page
    res.redirect('/shop');
  })
  .catch(err => {
    // Handle error
    console.error('Error creating product:', err);
    res.status(500).send('Failed to create product');
  });
};


exports.geteditproduct = (req, res, next) => {
  const productId = req.params.productId; // dynamic segment
  const editMode = req.query.edit; // key parameter

  if (editMode === "false") {
      return res.redirect('/shop');
  }

  const user = req.user;

  // Assuming you've set up the association properly, you can directly use include to get the product
  user.getProducts({where:{id:productId}})
      .then(product => {
          if (!product) {
              return res.redirect('/shop');
          }

          res.render('admin/edit-product', {
              pageTitle: 'Edit Product',
              path: '/admin/Edit-Product',
              editing: true,
              product: product[0]
          });
      })
      .catch(err => {
          console.error(err);
          res.status(500).send('Internal Server Error');
      });
};
exports.getproducts = async(req, res, next) => {
  const user=req.user;
  console.log(user);
  const products=await user.getProducts();
  res.render('admin/product-list', {
    prods: products,
    pageTitle: "Admin products",
    path: "/admin/products"
  });

 
    
 
}
exports.postDeleteProduct=(req,res,next)=>{
  
  const id=req.body.productId;
  Product.findByPk(id).then(data=>{
   data.destroy().then(()=>{
    res.redirect('/shop');
   }).catch(err=>{
    console.log(err)
   })
  }).catch(err=>{
    console.log(err);
  })
 

  
}