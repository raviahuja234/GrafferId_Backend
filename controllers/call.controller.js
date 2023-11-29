const callModel = require('../models/call.model');
const axios = require('axios');

/**fetch callerlist */
exports.findAll = async (req, res) => {
    try {

        const callList = await callModel.find();
        console.log('callList>><<'+callList);
        res.status(200).send(callList);
    } catch (err) {
        console.log(`Error is : ${err}`);
        res.status(500).send({
            message: "Internal server Error"
        });
    }
}

exports.addCall = async (req, res) => {

    const { callerName, callerId} = req.body;
    const callObj = { callerName, callerId};
    console.log(callObj);

    try {
        const order = await callModel.create(callObj);
        res.status(200).send(callObj);
    } catch (err) {
        console.log('Error : ' + err.message);
        res.status(500).send({
            message: "Internal server error."
        });
    }
}

exports.filteredCalllist = async (req, res) => {
    try {
        const {callerId, callerName} = req.body;
        console.log('params>>'+callerId);
        if(callerId && callerName){
            var aggregatePipeline = [
                {$match:{callerId:callerId}},
                {$match:{callerName:callerName}}
            ]
        }else if(callerId && !callerName){
            var aggregatePipeline = [
                {$match:{callerId:callerId}}
            ]
        }else{
            var aggregatePipeline = [
                {$match:{callerName:callerName}}
            ]
        }  
        const callList = await callModel.aggregate(aggregatePipeline);
        console.log('callList>><<'+JSON.stringify(callList));
        res.status(200).send(callList);
    } catch (err) {
        console.log(`Error is : ${err}`);
        res.status(500).send({
            message: "Internal server Error"
        });
    }
}

exports.addFilter = async (req, res) => {
    try {
        const {key, value} = req.body;
        console.log('params>>'+key);
        if(key && value){
            var aggregatePipeline = [
                {$addfields:{key : value}}
            ]
        }else if(key && !value){
            res.status(200).send({message:"Value is mandatory"});
        }else{
            res.status(200).send({message:"Key is mandatory"});
        }  
        const callList = await callModel.aggregate(aggregatePipeline);
        console.log('callList>><<'+JSON.stringify(callList));
        res.status(200).send(callList);
    } catch (err) {
        console.log(`Error is : ${err}`);
        res.status(500).send({
            message: "Internal server Error"
        });
    }
}