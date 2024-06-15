
const Product = require('../models/product');
const Order=require('../models/order');
const Cart=require('../models/cart');


const { use, patch } = require('../routes/admin');
const { Json } = require('sequelize/lib/utils');
const product = require('../models/product');



exports.getOrder = async (req, res, next) => {
  const orders = await Order.find({"User.id":req.user._id});
  console.log(orders);
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'your orders',
    orders: orders
  })
}
exports.showproducts = async (req, res, next) => {

  const data = await Product.find()
  res.render('shop/product-list', {
    prods: data,
    pageTitle: 'Products',
    path: '/product'
  })



}

exports.getIndex = async (req, res, next) => {
  const products = await Product.find();
  res.render('shop/index', {
    prods: products,
    pageTitle: 'Shop',
    path: '/shop'
  })

}
exports.postcart = async (req, res, next) => {
  const User = req.user;
  const productId = req.body.productId;
  const product = await Product.findById(productId);
  const cart=await Cart.findOne({'User.id':User._id});
 await cart.addProduct(product);
  
  
  res.redirect('/cart');
}

exports.getcheeckout = (req, res, next) => {
  res.render('shop/cheeckout',
    {
      path: '/cheeckout',
      pageTitle: "cheeckout"
    });
}
exports.getProduct = async (req, res, next) => {
  const productID = req.params.productID;
  const product = await Product.findById(productID);
  res.render('shop/product-detail',
    {

      pageTitle: "Deatils",
      product: product,
      path: "/products"
    });




}

exports.getcart = async (req, res, next) => {
  const user = req.user;
  const cart = await Cart.findOne({'User.id':user._id}).populate('items.ProductId');
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your cart',
    products: cart.items,
    totalPrice:cart.TotalPrice
  })
}

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
        name:user.name,
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

  const user = req.user;
  const cart=await Cart.findOne({"User.id":user._id});
  const product=await Product.findById(productId);
  console.log(cart);
   cart.deleteProduct(product);
   res.redirect('/cart');

}

