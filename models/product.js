const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId:{// one to Many relation
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})
module.exports = mongoose.model('Product', productSchema);
