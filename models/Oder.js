const { Schema, model, default: mongoose, mongo } = require('mongoose');

const singleCartItemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
    },
});

const orderSchema = new Schema ({
    tax: {
        type: Number,
        required: true,
    },

    shippiongFess: {
        type: Number,
        required: true,
    },

    subtotal: {
        type: Number,
        required: true,
    },

    total: {
        type: Number,
        required: true,
    },

    cartItems: [],

    status: {
        type: String,
        enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
        default: 'pending',
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },

    clientSecret: {
        type: String,
        required: true,
    },

    paymentIntentId: {
        type: String,
    },

}, {timestamps: true});

module.exports = model('Order', orderSchema);