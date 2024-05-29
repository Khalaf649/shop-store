const sequelize = require('sequelize');
const Product = require('../models/product');
const Cart=require('../models/cart');
const Cartitems=require('../models/cart-item');
const Sequelize=require('sequelize');
const { use, patch } = require('../routes/admin');
const Order=require('../models/order');
const orderlist=require('../models/order.item');

exports.getOrder=async(req,res,next)=>{
 const user=req.user;
 const orders=await user.getOrders({include:['products']});
 console.log(orders);
 res.render('shop/orders',{
  path:'/orders',
  pageTitle:'your orders',
  orders:orders
 })
}
exports.showproducts = async(req, res, next) => {

 const data=await Product.fetchAll()
  res.render('shop/product-list', {
    prods: data,
    pageTitle: 'Products',
    path: '/product'
  })


}

exports.getIndex = async(req, res, next) => {
  const products=await Product.fetchAll();
  res.render('shop/index', {
    prods: products,
    pageTitle: 'Shop',
    path: '/shop'
  })

}
exports.postcart = async(req, res, next) => {
  const productId = req.body.productId;
  const user=req.user;
  const cart=await user.getCart();
  const products=await cart.getProducts({where:{id:productId}});
  if(products.length > 0)
    {
     let product=products[0];
    let quantity= await product.Cartitems.quantity;
    quantity+=1;
    await cart.addProduct(product, { through: { quantity: quantity } });
    res.redirect('/shop');

    }
    else{
     const product=await Product.findByPk(productId);
     await cart.addProduct(product, { through: { quantity: 1 } });
      res.redirect('/cart');
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
const product=await Product.fetchOne(productID);
res.render('shop/product-detail',
{

  pageTitle: "Deatils",
  product: product,
  path: "/products"
});
  



}

exports.getcart = async(req, res, next) => {
  const user=req.user;
  const cart=await user.getCart();
  const products=await cart.getProducts();
  res.render('shop/cart',{
    path:'/cart',
    pageTitle:'Your cart',
    products:products
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
exports.postorder=async(req,res,next)=>{
  const user=req.user;
  const cart=await user.getCart();
  const products=await cart.getProducts();
 const order= await user.createOrder();
 for(let i=0;i<products.length;i++)
    order.addProduct(products[i],{ through: { quantity: products[i].Cartitems.quantity }})
  

await cart.setProducts(null);
res.redirect('/orders');

}
exports.postDeleteCart = async(req, res, next) => {
  const productId=req.body.productId;
 const user=req.user;
 const cart=await user.getCart();
 const products=await cart.getProducts({where:{id:productId}});
 if(products.length > 0)
  {
    let product=products[0];
    await product.Cartitems.destroy();
    res.redirect('/shop');

  }
}

