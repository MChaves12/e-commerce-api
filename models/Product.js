const { Schema, model, default: mongoose } = require('mongoose');

const productSchema = new Schema ({
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
        required: [true, 'Please provide a product description'],
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
        default:['#222'],
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

}, {timestamps: true, toJSON:{virtuals: true}, toObject:{virtuals:true}});

productSchema.virtual('reviews', {
    ref:'Review',
    localField:'_id',
    foreignField: 'product',
    justOne: false,
});

productSchema.pre('deleteOne', async function(next){
    await this.model('Review').deleteMany({product: this._id});
})

module.exports = model('Product', productSchema);
