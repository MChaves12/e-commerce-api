const Review = require("../models/Review");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomErrors = require("../errors");
const { checkPermissions } = require("../utils");

const createReview = async (req, res) => {
  const { product: productId } = req.body;

  const isValidProduct = await Product.findOne({ _id: productId });

  if (!isValidProduct) {
    throw new CustomErrors.NotFoundError(
      `No product Found with id: ${productId}`
    );
  }

  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}).populate({path:'product', select: 'name category price'});
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId }).populate({path:'product', select: 'name category price'});

  if (!review) {
    throw new CustomErrors.NotFoundError(`No review with id: ${reviewId}`);
  }

  res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOneAndUpdate({ _id: reviewId }, req.body, {new: true, runValidators: true});

  if (!review) {
    throw new CustomErrors.NotFoundError(`No review with id: ${reviewId}`);
  }

  checkPermissions(req.user, review.user);
  res.status(StatusCodes.OK).json({ review });

};

const deleteReview = async (req, res) => {
    const { id: reviewId } = req.params;

    const review = await Review.findOne({ _id: reviewId });
  
    if (!review) {
      throw new CustomErrors.NotFoundError(`No review with id: ${reviewId}`);
    }

    checkPermissions(req.user, review.user);
    await review.deleteOne();
    res.status(StatusCodes.OK).json({ msg: 'review deleted' });

};

const getSingleProductReviews = async (req, res) => {
  const {id:productId} = req.params;
  const reviews = await Review.find({product: productId});
  res.status(StatusCodes.OK).json({reviews, count: reviews.length});
}

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
};
