const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    orderId:{
        type: Number,
        ref: "Order"
    },
});

module.exports = mongoose.model("orderUserId", orderSchema);