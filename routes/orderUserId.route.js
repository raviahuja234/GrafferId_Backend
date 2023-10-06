const orderUserIdController = require('../controllers/orderUserId.controller');
const authMiddleware = require('../middleware/auth');

module.exports = function(app){

    //post to app with emailorphone
    app.post("/crm/api/v1/orderUserId",orderUserIdController.addOrderUserId);
}