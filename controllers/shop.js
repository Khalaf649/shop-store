
const Product = require('../models/product');
const Order=require('../models/order');


const { use, patch } = require('../routes/admin');



exports.getOrder = async (req, res, next) => {
  const orders = await Order.find();
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
  await User.addToCart(product);
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
  const cart = await user.getCart();
  console.log(cart);
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your cart',
    products: cart,
    totalPrice:user.cart.TotalPrice
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
 // Import the Order model

exports.postorder = async (req, res, next) => {
    try {
        const user = req.user; 
        const cart = await user.getCart(); 
        
      console.log(cart);
        const order = new Order({
            user: {
                userId: req.user._id,
                username: req.user.name 
            },
            items:cart.map(item=>{
              return {
                Product:item.ProductId._doc,
                ProductQuantity:item.Quantity
              }
            })

          
        });

        // Save the order to the database
        await order.save();

        // Clear the user's cart (assuming you have a method for this in your user model)
         user.cart={
          items:[],
          TotalPrice:0
        }
       await user.save();

        // Redirect to a shop page or another appropriate route
        res.redirect('/shop');
    } catch (error) {
        // Handle errors appropriately
        console.error('Error creating order:', error);
        // Redirect or respond with an error message
        res.status(500).send('Failed to place order');
    }
};

exports.postDeleteCart = async (req, res, next) => {
  const productId = req.body.productId;

  const user = req.user;
  await user.deleteFromCart(productId);
  res.redirect('/cart');

}

