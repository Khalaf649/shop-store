
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
 await Product.findByIdAndUpdate(productID,{
  title:producttitle,
  price:productprice,
  description:productDescribtion,
  imageUrl:productimage,
  userId:req.user._id

 })
 res.redirect('/shop');

}
exports.postaddproduct = async(req, res, next) => {
  // Assuming req.user represents the currently authenticated user
    const product=new Product({
      title:req.body.title,
      price:req.body.price,
      description:req.body.description,
      imageUrl:req.body.imageUrl,
      userId:req.user._id
    })
  await product.save();

  res.redirect('/shop');

};


exports.geteditproduct = async(req, res, next) => {
  const productId = req.params.productId; // dynamic segment
  const editMode = req.query.edit; // key parameter
  if (editMode === "false") {
      return res.redirect('/shop');
  }

  const product=await Product.findById(productId);
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/Edit-Product',
    editing: true,
    product: product
});
  
};
exports.getproducts = async(req, res, next) => {
  const products=await  Product.find()
  // .select('title price -_id ').populate('userId','name email -_id');
  console.log(products);
  res.render('admin/product-list', {
    prods: products,
    pageTitle: "Admin products",
    path: "/admin/products"
  });

 
    
 
}
exports.postDeleteProduct=async(req,res,next)=>{
  
  const id=req.body.productId;
  await Product.findByIdAndDelete(id);
  
  res.redirect('/shop');
 

  
}