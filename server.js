const express = require('express');
const app = express();
const serverConfig = require('./configs/server.config');
const cors = require('cors');
const dbConfig = require('./configs/db.configs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

db.once("open",() => {
    console.log('Successfully connected to mongodb');
});

db.on("error",() => {
    console.log('Error in connecting to mongodb');
    process.exit();
})

app.listen(serverConfig.PORT,() => {
    console.log(`Server is running on Port ${serverConfig.PORT}`);
});

app.get('/testRoute',(req,res) => {
    res.send('Server is up and running');
});

//require('./routes/user.route')(app);
//require('./routes/orderUserId.route')(app);
//require('./routes/order.routes')(app);
require('./routes/call.routes')(app);