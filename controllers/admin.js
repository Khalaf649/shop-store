const Product = require('../models/products');


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

  Product.create({
    title:req.body.title,
    price:req.body.price,
    imageUrl:req.body.imageUrl,
    description:req.body.description
  }).then(()=>{
    res.redirect('/shop');
  }).catch(err=>{
    console.log(err);
  })

  
};

exports.geteditproduct = async(req, res, next) => {
  const productId=req.params.productId;// dynamic segment
  const EditMode=req.query.edit // key parameter
  if(EditMode==="false")
  {
    return res.redirect('/shop');
  }
  
  try
  {
    const product=await Product.findByPk(productId);
   res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/Edit-Product',
    editing:true,
    product:product
   
  });
}
catch(err)
{
  console.log(err);
}

 
  
}
exports.getproducts = (req, res, next) => {
  Product.findAll().then(data=>{
    res.render('admin/product-list', {
      prods: data,
      pageTitle: "Admin products",
      path: "/admin/products"
    });
  }).catch(err=>{
    console.log(err);
  })

 
    
 
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