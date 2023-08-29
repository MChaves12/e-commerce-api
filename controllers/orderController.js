
const createOrder = async (req, res) => {
    res.send('create order');
};

const getAllOrders = async (req, res) => {
    res.send('get all orders');
};

const getCurrentUserOrders = async (req, res) => {
    res.send('get current order');
};

const getSingleOrder = async (req, res) => {
    res.send('get single order');
};

const updateOrder = async (req, res) => {
    res.send('update order');
};

const deleteOrder = async (req, res) => {
    res.send('delete order');
};

module.exports = {
    createOrder,
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    updateOrder,
    deleteOrder,
};
