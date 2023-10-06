const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    orderName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    // password:{
    //     type:String,
    //     required:true
    // },
    // emailOrPhone:{
    //     type:String,
    //     required:true,
    //     lowercase:true,
    //     unique:true
    // },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now();
        }
    },
    orderDate:{
        type:Date,
        default:()=>{
            return Date.now();
        }
    },
    // updatedAt:{
    //     type:Date,
    //     default:()=>{
    //         return Date.now();
    //     }
    // },
//     userType:{
//         type:String,
//         required:true,
//         default:"CUSTOMER"
//     },
//    userStatus:{
//         type:String,
//         default:"APPROVED",        
//     },
    orderStatus:{
        type:String,
               
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
    numberOfItems:{
        type: Number,
        ref: "Order"
    },
});

module.exports = mongoose.model("order", orderSchema);