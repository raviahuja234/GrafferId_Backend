const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth');

module.exports = function(app){
    
    app.post("/crm/api/v1/users", userController.verifyUser);

    //Post to DB
   // app.post("/crm/api/v1/addUser", userController.addUser);

    //post to app with emailorphone
    //app.post("/crm/api/v1/usersAndOrders",userController.verifyOrder);
}