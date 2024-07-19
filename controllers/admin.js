const { validationResult } = require('express-validator');
const Product = require('../models/product');
const ITEMS_PER_PAGE = 3;
exports.getaddproduct = (req, res, next) => {
  try {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/addproduct',
      editing: false,
      error: req.flash('error')
    });
  }
  catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
}

exports.postaddproduct = async (req, res, next) => {
  // Assuming req.session.user represents the currently authenticated user
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('error', errors.array()[0].msg);
    return res.redirect('/admin/addproduct');

  }
  try {
    const product = new Product({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      userId: req.user._id
    })
    await product.save();
    res.redirect('/shop');
  }
  catch (err) {

    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);

  }


};


exports.geteditproduct = async (req, res, next) => {
  const productId = req.params.productId; // dynamic segment
  const editMode = req.query.edit; // key parameter
  if (editMode !== "true") {
    return res.redirect('/shop');
  }

  try {
    const product = await Product.findById(productId)
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/Edit-Product',
      editing: true,
      product: product,
      error: req.flash('error')
    });
  }
  catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    next(error);
  }


};
exports.getproducts = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const products = await Product.find({ userId: req.user._id }).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
    res.render('admin/product-list', {
      prods: products,
      pageTitle: "Admin products",
      path: "/admin/products",
    });
  }
  catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }




}
exports.DeleteProduct = async (req, res, next) => {

  try {
    const id = req.params.productId;
    const product = await Product.findById(id);
    if (product.userId.toString() !== req.user._id.toString())
      return res.redirect('/shop');
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      message: "Deleted Sucessfully"
    })
  }
  catch (err) {
    res.status(500).json({
      message: "something happen",
      error: err
    })
  }



}
exports.PostEditProduct = async (req, res, next) => {
  const productId = req.body.productID
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('error', errors.array()[0].msg);
    return res.status(402).redirect(`/admin/Edit-Product/${productId}/?edit=true`);
  }
  try {
    const product = await Product.findById(productId);
    if (!product) {
      req.flash('error', 'Product not found.');
      return res.status(402).redirect(`/admin/Edit-Product/${productId}/?edit=true`);
    }

    // Authorization check
    if (product.userId.toString() !== req.user._id.toString()) {
      req.flash('error', 'You are not authorized to edit this product.');
      return res.status(402).redirect(`/admin/Edit-Product/${productId}/?edit=true`);
    }

    // Update the product
    await Product.findByIdAndUpdate(productId, {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      userId: req.user._id
    });
    res.redirect('/shop');
  } catch (err) {
    console.log(err);
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }

}