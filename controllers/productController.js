const Product = require('../models/Product');
const {StatusCodes} = require('http-status-codes');
const CustomErrors = require('../errors');


const createProduct = async (req, res) => {
    req.body.user = req.user.userId;
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({product});
};

const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({ products, count: products.length }).populate({path:'reviews'});
};

const getAllProductsByCategory = async (req, res) => {
    const {category: cat} = req.params;

    const products = await Product.find({category: cat});
    res.status(StatusCodes.OK).json({ products, count: products.length }).populate({ path: 'reviews'})
}

const getSingleProduct = async (req, res) => {
    const {id: productId} = req.params;

    const product = await Product.findOne({_id: productId}).populate({path: 'reviews'});

    if(!product) {
        throw new CustomErrors.NotFoundError(`No Product with id: ${productId}`);
    }

    res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
    const {id: productId} = req.params;

    const product = await Product.findByIdAndUpdate({_id: productId }, req.body, {new: true, runValidators: true});

    if(!product) {
        throw new CustomErrors.NotFoundError(`No Product with id: ${productId}`);
    }

    res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
    const { id: productId } = req.params;

    const product = await Product.findOne({_id: productId});

    if(!product) {
        throw new CustomErrors.NotFoundError(`No Product with id: ${productId}`);
    };

    await product.deleteOne();
    res.status(StatusCodes.OK).json({msg: 'Product deleted'});
};

const uploadImage = async (req, res) => {
    if(!req.files) {
        throw new CustomErrors.BadRequestError('No file uploaded');
    }
    
    const productImage = req.files.image;

    if(!productImage.mimetype.startsWith('image')){
        throw new CustomErrors.BadRequestError('Please upload image');
    }

    const maxSize = 1024 * 1024;

    if(productImage.size > maxSize){
        throw new CustomErrors.BadRequestError('Please upload image smaller then 1MB');
    }

    const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`);

    await productImage.mv(imagePath);
    res.status(StatusCodes.OK).json({image: `/uploads/${productImage.name}`});
};

module.exports = {
    createProduct,
    getAllProducts,
    getAllProductsByCategory,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
};
