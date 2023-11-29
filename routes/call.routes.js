const callController = require('../controllers/call.controller');
//const authMiddleware = require('../middleware/auth');

module.exports = function(app){
    //get from DB
    app.get("/getcalllist", callController.findAll);

    //get from DB
    app.post("/getfilteredcalls", callController.filteredCalllist);

    //post to db
    app.post("/addCaller",callController.addCall);

    //post to db
    app.post("/addFilter",callController.addFilter);
}