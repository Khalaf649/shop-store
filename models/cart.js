const mongoose = require('mongoose');
const product = require('./product');
const Schema = mongoose.Schema;
const cartScehma = new Schema({
    items: [{
        ProductId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        }, Quantity: {
            type: Schema.Types.Number,
            required: true
        }
    }]
    ,
    TotalPrice: {
        type: Schema.Types.Number,
        required: true,
        default: 0
    },
    TotalQuantity: {
        type: Schema.Types.Number,
        required: true,
        default: 0
    },
    User: { // one to one relation
        name: {
            type: Schema.Types.String,
            required: true
        },
        id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }
})
cartScehma.methods.addProduct = async function (product) {
    const index = this.items.findIndex(cb => {
        return cb.ProductId.toString() === product._id.toString();
    })
    if (index !== -1)
        this.items[index].Quantity += 1;
    else
        this.items.push({
            ProductId: product._id,
            Quantity: 1
        })
        this.TotalPrice+=product.price;
        this.TotalQuantity+=1;
     await   this.save();

}
cartScehma.methods.deleteProduct=async function(product)
{
    const index=this.items.findIndex(cb=>{
        return cb.ProductId.toString()===product._id.toString();
    })
    this.TotalPrice-=this.items[index].Quantity*product.price;
    this.TotalQuantity-=this.items[index].Quantity;
    this.items.splice(index,1);
   await this.save();
 
}
cartScehma.methods.getProducts=async function()
{
    await this.populate(items.ProductId);
    return this.items;
}
module.exports = mongoose.model('Cart', cartScehma);