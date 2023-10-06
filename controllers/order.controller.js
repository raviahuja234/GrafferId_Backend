const orderModel = require('../models/order.model');
const axios = require('axios');

/*** fetch list of all users */
exports.findAll = async (req, res) => {
    try {

        const orders = await orderModel.find();
        console.log('orders>><<'+orders);
        res.status(200).send(orders);
    } catch (err) {
        console.log(`Error is : ${err}`);
        res.status(500).send({
            message: "Internal server Error"
        });
    }
}

exports.addOrder = async (req, res) => {

    const { orderName, userId, userName, orderDate, orderStatus, numberOfItems} = req.body;
    const orderObj = { orderName, userId, userName, orderDate, orderStatus, numberOfItems};
    console.log(orderObj);

    try {
        const order = await orderModel.create(orderObj);
        res.status(200).send(orderObj);
    } catch (err) {
        console.log('Error : ' + err.message);
        res.status(500).send({
            message: "Internal server error."
        });
    }
}