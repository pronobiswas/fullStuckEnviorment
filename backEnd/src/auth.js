const express = require("express");
const { Router } = express;
const _ = Router();
const {registetionControler, otpMatchControler} = require('./Controler/authControler.js')

_.get("/auth",(req,res)=>{
    res.send("Hello BackEnd")
});
_.get("/auth/reg",(req,res)=>{

    res.send("Hello BackEnd Registetion")
});
_.post("/signup",registetionControler)
_.post("/verifyOTP",otpMatchControler)



module.exports = _;