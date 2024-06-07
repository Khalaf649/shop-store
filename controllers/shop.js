
const Product = require('../models/product');


const { use, patch } = require('../routes/admin');



exports.getOrder = async (req, res, next) => {
  const user = req.user;
  const orders = await user.getOrders();
  console.log(orders);
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'your orders',
    orders: orders
  })
}
exports.showproducts = async (req, res, next) => {

  const data = await Product.fetchAll()
  res.render('shop/product-list', {
    prods: data,
    pageTitle: 'Products',
    path: '/product'
  })


}

exports.getIndex = async (req, res, next) => {
  const products = await Product.fetchAll();
  res.render('shop/index', {
    prods: products,
    pageTitle: 'Shop',
    path: '/shop'
  })

}
exports.postcart = async (req, res, next) => {
  const User = req.user;
  const productId = req.body.productId;
  const product = await Product.fetchOne(productId);
  User.addToCart(product);
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
  const product = await Product.fetchOne(productID);
  res.render('shop/product-detail',
    {

      pageTitle: "Deatils",
      product: product,
      path: "/products"
    });




}

exports.getcart = async (req, res, next) => {
  const user = req.user;
  const cart = await user.getCart();
  const products =
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your cart',
      products: cart
    })


  // Cart.fetch((cart) => {
  //   Product.fetch((products) => {
  //     const ans = [];
  //     for (var i = 0; i < cart.prods.length; i++) {
  //       for (var j = 0; j < products.length; j++) {
  //         if (cart.prods[i].id === products[j].id) {
  //           ans.push(
  //             {
  //               product: products[j],
  //               qty: cart.prods[i].qty,
  //               price: cart.prods[i].TotalPrice

  //             }
  //           )
  //         }
  //       }
  //     }
  //     
  //   })
  // })
}
exports.postorder = async (req, res, next) => {
  console.log('a7a');
  const user = req.user;
 await user.addOrder();
 res.redirect('/order');

}
exports.postDeleteCart = async (req, res, next) => {
  const productId = req.body.productId;
  
  const user = req.user;
    user.deleteFromCart(productId);
    res.redirect('/cart');

}

