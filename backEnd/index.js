const express = require('express')
const app = express();
const mongoose = require('mongoose');
const { Schema } = mongoose;

// const dbUser = bpronobbiswasinfo
// const dbPass = rFWSHT6ghJs84EWG
// mongodb+srv://bpronobbiswasinfo:rFWSHT6ghJs84EWG@cluster0.xparo.mongodb.net/myfirstDataBase


// =========database connection=========

mongoose.connect("mongodb+srv://bpronobbiswasinfo:rFWSHT6ghJs84EWG@cluster0.xparo.mongodb.net/myfirstDataBase").then(()=>{
    console.log("connect database");
    
}).catch((err)=>{
    console.log(`database connection faild ${err}`);
    
});
// =========database connection=========

// <<<<<<<<<<< middleWare >>>>>>>>>>>>>
app.use(express.json());
app.use(express.urlencoded());
// <<<<<<<<<<< middleWare >>>>>>>>>>>>>

// =======make a schema==========
const mySchema = new Schema({
    userName:{
        type:String,
        min:5,
        max:15,
        required :true,
        trim : true,
    },
    email:{
        type:String,
        required :true,
        trim : true,
    }, 
    userData:{
        type:String,
        required :true,
        trim : true,
    }
})
const dataModel = mongoose.model("user" , mySchema );


app.post('/home', (req, res)=> {
    console.log(req.body);
  })
  
app.listen(3000, ()=>{
    console.log("server running");
})