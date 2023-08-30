const Order = require("../models/Oder");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomErrors = require("../errors");
const { checkPermissions } = require("../utils");

const fakeStripAPI = async ({ amount, currency }) => {
  const client_secret = "someRandomValue";
  return { client_secret, amount };
};

const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomErrors.BadRequestError("No cart items provided");
  }

  if (!tax || !shippingFee) {
    throw new CustomErrors.BadRequestError(
      "Please provide tax and shipping fee"
    );
  }

  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new CustomErrors.NotFoundError(
        `No product found with id: ${item.product}`
      );
    }

    const { name, price, image, _id } = dbProduct;
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };

    orderItems = [...orderItems, singleOrderItem];

    subtotal += item.amount * price;
  }

  const total = tax + shippingFee + subtotal;
  const paymentIntent = await fakeStripAPI({
    amount: total,
    currency: "usd",
  });

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });

  res.status(StatusCodes.CREATED).json({order, clientSecret:order.clientSecret})
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({orders, count: orders.length});
};

const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({user: req.user.userId});
  res.status(StatusCodes.OK).json({orders, count: orders.length});
};

const getSingleOrder = async (req, res) => {
  const {id: orderId} = req.params;

  const order = await Order.findOne({_id: orderId});

  if(!order){
    throw new CustomErrors.NotFoundError(`No order found with id: ${orderId}`)
  };
  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({order});
};

const updateOrder = async (req, res) => {
    const {id: orderId} = req.params;
    const {paymentIntent} = req.body;

    const order = await Order.findOne({_id: orderId});

    if(!order){
        throw new CustomErrors.NotFoundError(`No order found with id: ${orderId}`)
    };

    checkPermissions(req.user, order.user);

    order.paymentIntentId = paymentIntentId;
    order.status = 'paid';
    await order.save()
    
    res.status(StatusCodes.OK).json({order});
};

const deleteOrder = async (req, res) => {
  res.send("delete order");
};

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
  deleteOrder,
};
