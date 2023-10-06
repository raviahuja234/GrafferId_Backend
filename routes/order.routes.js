const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middleware/auth');

module.exports = function(app){
    //get from DB
    app.get("/crm/api/v1/orders", orderController.findAll);

    //post to db
    app.post("/crm/api/v1/addOrder",orderController.addOrder);
}