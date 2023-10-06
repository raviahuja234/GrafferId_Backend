const orderUserIdModel = require('../models/orderUserId.model');
const axios = require('axios');


exports.addOrderUserId = async (req, res) => {

    const { userId, orderId } = req.body;
    const OrderUserIdObj = { userId, orderId };
    console.log(OrderUserIdObj);

    try {
        const orderUserId = await orderUserIdModel.create(OrderUserIdObj);
        res.status(200).send(orderUserId);
    } catch (err) {
        console.log('Error : ' + err.message);
        res.status(500).send({
            message: "Internal server error."
        });
    }
}