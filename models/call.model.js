const mongoose = require('mongoose');
const callSchema = new mongoose.Schema({
    callerName:{
        type:String,
        required:true
    },
    callerId:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now();
        }
     }
    
});

module.exports = mongoose.model("call", callSchema);