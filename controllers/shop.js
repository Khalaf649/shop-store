
const Product = require('../models/product');
const Order=require('../models/order');
const Cart=require('../models/cart');


const { use, patch } = require('../routes/admin');
const { Json } = require('sequelize/lib/utils');
const product = require('../models/product');
const router = require('../routes/admin');



exports.getOrder = async (req, res, next) => {
  const orders = await Order.find({"User.id":req.user._id});
  console.log(orders);
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'your orders',
    orders: orders,
  })
}
exports.showproducts = async (req, res, next) => {

  const data = await Product.find()
  res.render('shop/product-list', {
    prods: data,
    pageTitle: 'Products',
    path: '/product',


  })



}

exports.getIndex = async (req, res, next) => {
  const products = await Product.find();
  res.render('shop/index', {
    prods: products,
    pageTitle: 'Shop',
    path: '/shop',
  })
}

exports.postcart = async (req, res, next) => {
  const User = req.user;
  const productId = req.body.productId;
  console.log(User);
  const product = await Product.findById(productId);
  const cart=await Cart.findOne({'User.id':User._id});
 await cart.addProduct(product);
  
  
  res.redirect('/cart');
}

exports.getcheeckout = (req, res, next) => {
  res.render('shop/cheeckout',
    {
      path: '/cheeckout',
      pageTitle: "cheeckout",
      
    });
}
exports.getProduct = async (req, res, next) => {
  const productID = req.params.productID;
  const product = await Product.findById(productID);
  res.render('shop/product-detail',
    {

      pageTitle: "Deatils",
      product: product,
      path: "/products",
     
    
    });




}

exports.getcart= async (req, res, next) => {
  try {
    // Ensure user is authenticated
    if (!req.session.user) {
      return res.redirect('/login'); // Redirect to login if user is not authenticated
    }

    const user = req.user;

    // Fetch the user's cart and populate the products in the items array
    const cart = await Cart.findOne({ 'User.id': req.session.user._id }).populate('items.ProductId');
    
    // Check if cart exists
    if (!cart) {
      return res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: [],
        totalPrice: 0,
       
      });
    }
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: cart.items,
      totalPrice: cart.TotalPrice,
 
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    next(error); // Pass the error to the error handling middleware
  }
};


exports.postorder = async (req, res, next) => {
    const user=req.user;
    const cart=await Cart.findOne({"User.id":user._id}).populate("items.ProductId");
    const order=new Order({
      items:cart.items.map(i=>{
        return {
          product:i.ProductId.toObject(),
          Quantity:i.Quantity
        }
      }),
      TotalPrice:cart.TotalPrice,
      TotalQuantity:cart.TotalQuantity,
      User:{
        email:user.email,
        id:user._id
      }

    }
       )
       cart.items=[];
       cart.TotalPrice=0;
       cart.TotalQuantity=0;
    
       await cart.save();
       await order.save();
       res.redirect('/orders'); 
};

exports.postDeleteCart = async (req, res, next) => {
  const productId = req.body.productId;
console.log(productId);
  const user = req.user;
  const cart=await Cart.findOne({"User.id":user._id});
  const product=await Product.findById(productId);
  console.log(cart);
   cart.deleteProduct(product);
   res.redirect('/cart');

}

