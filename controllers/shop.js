const { where } = require('sequelize');
const Product = require('../models/product');
const { use } = require('../routes/admin');
const cartItem=require('../models/cart-item');


exports.showproducts = (req, res, next) => {

  Product.findAll().then(data => {
    res.render('shop/product-list', {
      prods: data,
      pageTitle: 'Products',
      path: '/product'
    })
  }).catch(err => {
    console.log(err);
  })


}

exports.getIndex = (req, res, next) => {
  Product.findAll().then(data=>{
    res.render('shop/index', {
      prods: data,
      pageTitle: 'Shop',
      path: '/shop'
    })
  }).catch(err=>{
    console.log(err);
  })

}
exports.postcart = async(req, res, next) => {
  const productId = req.body.productId;
  try {
      const cart = await req.user.getCart();
      const products = await cart.getProducts({ where: { id: productId } });
      let product;
      if (products.length > 0) {
          product = products[0];
       //   console.log(product);
          const qty = product.Cartitems.quantity;
         
          await cart.addProduct(product, { through: { quantity: qty + 1 } });
      } else {
          const product = await Product.findByPk(productId);
          await cart.addProduct(product, { through: { quantity: 1 } });
      }
      res.redirect('/cart');
  } catch (error) {
      console.error('Error adding product to cart:', error);
      res.status(500).send('Internal Server Error');
  }
}

exports.getcheeckout = (req, res, next) => {
  res.render('shop/cheeckout',
    {
      path: '/cheeckout',
      pageTitle: "cheeckout"
    });
}
exports.getProduct = async(req, res, next) => {
  const productID = req.params.productID;
const product=await Product.findByPk(productID);
res.render('shop/product-detail',
{

  pageTitle: "Deatils",
  product: product,
  path: "/products"
});
  



}

exports.getcart = async(req, res, next) => {
  const user=req.user;
  console.log(user);
  const cart=await user.getCart();
  console.log(cart);
  const products=await cart.getProducts();
  res.render('shop/cart',
        {
          pageTitle: "Your Cart",
          path: "/cart",
          products: products,
          TotalPrice: 0,
          TotalQuantity:0
        });
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

exports.postDeleteCart = (req, res, next) => {
  Cart.DeleteByid(req.body.productId);
  res.redirect('/shop');
}

