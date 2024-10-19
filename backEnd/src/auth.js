const express = require("express");
const { Router } = express;
const _ = Router();
const {registetionControler} = require('./Controler/authControler.js')

_.get("/auth",(req,res)=>{
    res.send("Hello BackEnd")
});
_.get("/auth/reg",(req,res)=>{

    res.send("Hello BackEnd Registetion")
});
_.post("/hi",registetionControler)


module.exports = _;