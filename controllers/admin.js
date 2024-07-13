const {validationResult}=require('express-validator');
const Product = require('../models/product');
exports.getaddproduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/addproduct',
    editing: false,
    error:req.flash('error')
  });
}

exports.postaddproduct = async (req, res, next) => {
  // Assuming req.session.user represents the currently authenticated user
  const errors=validationResult(req);
  if(!errors.isEmpty())
  {
    req.flash('error',errors.array()[0].msg);
    return res.status(402).redirect('/admin/addproduct')
  }
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    userId: req.session.user._id
  })
  await product.save();

  res.redirect('/shop');

};


exports.geteditproduct = async (req, res, next) => {
  const productId = req.params.productId; // dynamic segment
  const editMode = req.query.edit; // key parameter
  if (editMode === "false") {
    return res.redirect('/shop');
  }

  const product = await Product.findById(productId);
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/Edit-Product',
    editing: true,
    product: product,
    error:req.flash('error')

  });

};
exports.getproducts = async (req, res, next) => {
  const products = await Product.find({ userId: req.user._id })
  res.render('admin/product-list', {
    prods: products,
    pageTitle: "Admin products",
    path: "/admin/products",
  });




}
exports.postDeleteProduct = async (req, res, next) => {

  const id = req.body.productId;
  const product = await Product.findById(id);
  if (product.userId.toString() !== req.user._id.toString())
    return res.redirect('/shop');
  await Product.findByIdAndDelete(id);

  res.redirect('/shop');



}
exports.PostEditProduct = async (req, res, next) => {
  const errors=validationResult(req);
  if(!errors.isEmpty())
  {
    req.flash('error',errors.array()[0].msg);
    return res.status(402).redirect('/admin/Edit-Product')
  }
  try {
    const productID = req.body.productID;
    const product = await Product.findById(productID);
    if (!product) {
      req.flash('error', 'Product not found.');
      return res.redirect('/shop');
    }

    // Authorization check
    if (product.userId.toString() !== req.user._id.toString()) {
      console.log("asasa")
      req.flash('error', 'You are not authorized to edit this product.');
      return res.redirect('/shop');
    }

    // Update the product
    await Product.findByIdAndUpdate(productID, {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      userId: req.user._id
    });

    req.flash('success', 'Product updated successfully.');
    res.redirect('/shop');
  } catch (err) {
    console.error('Error updating product:', err);
    req.flash('error', 'An error occurred. Please try again later.');
    res.redirect('/shop');
  }

}