const Product = require('../models/products');


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
exports.postcart = (req, res, next) => {
  const id = req.body.productId;
  Product.FindById(id, (prodx) => {
    Cart.addProduct(id, prodx.price)
  })
  res.redirect('/cart');

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

exports.getcart = (req, res, next) => {
  Cart.fetch((cart) => {
    Product.fetch((products) => {
      const ans = [];
      for (var i = 0; i < cart.prods.length; i++) {
        for (var j = 0; j < products.length; j++) {
          if (cart.prods[i].id === products[j].id) {
            ans.push(
              {
                product: products[j],
                qty: cart.prods[i].qty,
                price: cart.prods[i].TotalPrice

              }
            )
          }
        }
      }
      res.render('shop/cart',
        {
          pageTitle: "Your Cart",
          path: "/cart",
          products: ans,
          TotalPrice: cart.TotalPrice,
          TotalQuantity: cart.TotalQuantity

        });
    })
  })
}

exports.postDeleteCart = (req, res, next) => {
  Cart.DeleteByid(req.body.productId);
  res.redirect('/shop');
}

