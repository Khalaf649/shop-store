const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    items: [{
        Product: {
            type: Object,
            required: true
        },
        ProductQuantity: {
            type: Number,
            required: true
        }
    }],
    user: {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User' // Reference to the User model
        },
        username: String // Optional: You can store the username here
    }
});

module.exports = mongoose.model('Order', orderSchema);
