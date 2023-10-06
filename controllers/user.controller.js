const userModel = require('../models/user.model');
const orderUserIdModel = require('../models/orderUserId.model');
const orderModel = require('../models/order.model');
const axios = require('axios');

/*** fetch list of all users */
exports.verifyUser = async (req, res) => {
    try {
        console.log('.');
        console.log('merchantId>>'+JSON.stringify(req.body));
        const merchantId = req.body.merchantId;
        
        const apiUrlMerch = `https://return-x.bubbleapps.io/version-live/api/1.1/wf/initiation`;

        const axiosConfigMerch = {
            headers: {
            'Authorization': 'Bearer 3c6da2551638a0b1ce21d7757a235430',
            },
            params: {
            'portal_slug': `${merchantId}`
            }
        };
        // returns merchant data
        await axios.get(apiUrlMerch, axiosConfigMerch)
        .then(response => {
            const merchant = response.data.response;
            const planStatus = merchant['11-plan_status'];
            console.log('merchants:', merchant);
            res.status(200).send(JSON.stringify(merchant));
            
        })
        .catch(error => {
            console.error('Error fetching :', error);
        });
        
        
    } catch (err) {
        console.log(`Error is : ${err}`);
        res.status(500).send({
            message: "Internal server Error"
        });
    }
}





requestServices = async () => {

    // Shopify API credentials
    const apiKey = '59c5986dce87cdae69c2deedd2c3be24';
    const accessToken = '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';
    const shopDomain = 'returnx-test.myshopify.com'; // Replace with your actual shop domain

    // API endpoint for fetching orders
    const apiUrl = `https://${shopDomain}/admin/api/2021-10/orders.json`;

    // Axios request configuration
    const axiosConfig = {
        headers: {
            'X-Shopify-Access-Token': accessToken,
        },
    };
    
    // Fetch orders using Axios
    try {
        const response = await axios.get(apiUrl, axiosConfig);
        const orders = Object.values(response.data.orders);
        return orders; // Return the orders array
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error; // Rethrow the error
    }
}

exports.verifyOrder = async (req, res) => {
    const emailOrPhone = req.body.emailOrPhone;
    const orderId = req.body.orderId;

    try {

        const orders = await requestServices();
        //email authentication function 
        console.log('emailorphone>><<'+emailOrPhone);
        const user = await orders.find(order => order.email == emailOrPhone || order.customer.phone == `+91${emailOrPhone}`);
        if (!user) {
                 return res.status(200).send({message: `Customer with ${emailOrPhone} is not associated with any orders`});
        }
        const order = await orders.find(order => (order.email == emailOrPhone || order.customer.phone == `+91${emailOrPhone}`) 
                                            && order.order_number == orderId);
        // const userId = user.userId;
        // console.log('userId>><<'+userId);
        // const orderIdToCheck = await user.orderId.find(orderId => orderId == orderId);
        // const order = await orderUserIdModel.findOne({ "userId": userId, "orderId": orderId });
        // console.log('order>><<'+order);
        // if(!order){
        //     return res.status(200).send({message:`order for user with id ${userId} is not present`});
        // }
        if(!order){
                 return res.status(200).send({message:`order with orderId ${orderId} for user with id ${emailOrPhone} is not present`});
        }
        
        //console.log('orders...'+JSON.stringify(orders));
        //console.log('order>><<'+JSON.stringify(order));
        console.log('order.order_name>>>'+order.order_number);
        console.log('order.created_at>>>'+order.created_at);
        if(order){
            console.log('innn');
            const newOrder = {
                "orderName": orderId,
                "userName": `${order.customer.first_name} ${order.customer.last_name}`,
                "orderStatus": order.fulfillment_status,
                "numberOfItems": order.line_items.length,
                "orderDate": order.created_at
            }
            console.log('innn');
            const tempOrder = await orderModel.findOne(({"orderName": orderId}));
            if(!tempOrder){
                console.log('tempordernotthere');
                if(order.fulfillment_status == "fulfilled"){
                    
                    await orderModel.create(newOrder);
                    console.log('newOrder><><' + newOrder);

                    return res.status(200).send(newOrder);
                }
                return res.status(200).send({message:'Order is not Fulfilled yet'});   
            }
            else{
                console.log('temporderthere');
                return res.status(200).send({message:`order for orderId ${orderId} is already verified`});
            }
        }
        
    } catch (err) {
        res.status(500).send({
            message: "Internal server error"
        });
        console.log('err>><<'+err.message);
    }
}