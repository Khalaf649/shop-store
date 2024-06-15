const mongoose = require('mongoose');
const Product = require('./product');
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    items: [{
        product: {
            type: Object,
            required: true
        },
        Quantity: {
            type: Schema.Types.Number,
            required: true
        }
    }],
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
    User:{ // one to one relation
        name:{
            type:Schema.Types.String,
            required:true
        },
        id:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'User'
        }
    }

})
module.exports=mongoose.model('Order',OrderSchema);