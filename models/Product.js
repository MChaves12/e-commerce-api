const { Schema, model, default: mongoose } = require('mongoose');

const productSchema = newSchema ({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide a product name'],
        maxlength: [100, 'Name can not be more than 100 caracteres']
    },

    price: {
        type: Number,
        required: [true, 'Please provide a product price'],
        default: 0
    },

    description: {
        type: String,
        required: [true, 'Please provide a product name'],
        maxlength: [1000, 'Name can not be more than 1000 caracteres']
    },

    image: {
        type: String,
        default: '/uploads/example.jpeg'
    },

    category: {
        type: String,
        required: [true, 'Please provide product category'],
        enum: ['office', 'kitchen', 'bedroom']
    },

    colors: {
        type: [String],
        required: true,
    },

    featured: {
        type: Boolean,
        default: false
    },

    freeShipping: {
        type: Boolean,
        default: false
    },

    inventory: {
        type: Number
    },

    averageRating: {
        type: Number,
        default: 0
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, {timestamps: true});

module.exports = model('Product', productSchema);
