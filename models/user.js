const mongoose = require('mongoose');
const { NUMBER } = require('sequelize');
const Schema = mongoose.Schema
//user
/*
name=>String
email=>String
cart :{
TotalPrice=>Number,
items:[{productId: , Quantity:}]
}








*/
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart:
    {
        items: [{
            ProductId: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            }, Quantity: {
                type: Number,
                required: true
            }
        }],
        TotalPrice: {
            type: Number,
            required: true
        }
    }



})
userSchema.methods.addToCart = async function (product) {// instance method
    const index = this.cart.items.findIndex(cb => {
        return cb.ProductId.toString() === product._id.toString();
    })
    if (index !== -1)
        this.cart.items[index].Quantity += 1;
    else
        this.cart.items.push({
            ProductId: product._id,
            Quantity: 1

        })
    this.cart.TotalPrice += product.price;
    await this.save();

}
userSchema.methods.getCart = async function () {
    await this.populate('cart.items.ProductId');
    return this.cart.items;
};
userSchema.methods.addOrder = async function () {
    const order = await this.getCart();
    for (let i = 0; i < order.length; i++)
        this.orders.items.push({ title: order[i].ProductId.title, Quantity: order[i].Quantity });
    this.cart = {
        items: [],
        TotalPrice: 0
    }
    await this.save();

}

userSchema.methods.deleteFromCart = async function (ProductId) {
    const updatedItems = this.cart.items.filter(cb => {
        return cb.ProductId.toString() !== ProductId.toString()
    })
    this.cart.items = updatedItems;
    this.save();
}
module.exports = mongoose.model('User', userSchema);