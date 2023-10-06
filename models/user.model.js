const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    // password:{
    //     type:String,
    //     required:true
    // },
    emailOrPhone:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now();
        }
     },
    // orderDate:{
    //     type:Date,
    //     immutable:true,
    //     default:()=>{
    //         return Date.now();
    //     }
    // },
    // updatedAt:{
    //     type:Date,
    //     default:()=>{
    //         return Date.now();
    //     }
    // },
    userType:{
        type:String,
        required:true,
        default:"CUSTOMER"
    },
   userStatus:{
        type:String,
        default:"APPROVED",        
    },
    // tickId:{
    //     type: [Number],
    //     ref: "Ticket"
    // },
    // ticketsCreated:{
    //     type:[mongoose.SchemaTypes.ObjectId],
    //     ref:"Ticket"
    // },
    // ticketAssigned:{
    //     type:[mongoose.SchemaTypes.ObjectId],
    //     ref:"Ticket"
    // },
    orderId:{
        type: [Number],
        ref: "Order"
    },
});

module.exports = mongoose.model("user", userSchema);