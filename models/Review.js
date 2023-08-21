const { Schema, model, default: mongoose } = require('mongoose');

const reviewSchema = new Schema ({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please provide a rating'],
    },

    title: {
        type: String,
        trim: true,
        required: [true, 'Please provide a review title'],
        maxlength: 100,
    },

    comment: {
        type: String,
        required: [true, 'Please provide review text'],
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true,
    }
}, {timestamps: true});

module.exports = model('Review', reviewSchema);
