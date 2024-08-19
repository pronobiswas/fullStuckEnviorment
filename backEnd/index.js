const express = require('express')
const app = express();
const mongoose = require('mongoose');
const { Schema } = mongoose;
const cors = require('cors')

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
app.use(express.urlencoded({origin :true}));
app.use(cors());
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


app.post('/post', async (req, res)=> {
    const {userName ,email , userData} = req.body;
    if (!userName){
        return res.status(400).json({
            error : "UrerName is Missing"
        })
    }
    if (!email){
        return res.status(400).json({
            error : "email is Missing"
        })
    }
    if (!userData){
        return res.status(400).json({
            error : "userData is Missing"
        })
    }


    const usersInformation = await dataModel.create({
        userName: userName,
        email :email , 
        userData : userData
    });
    usersInformation.save();
    res.status(200).json({
        sucess : true,
        data : usersInformation,
        message : "post data create in database"
    })


  })

//   ========get all data from database folder========
app.get ("/getAllData" , async(req,res)=>{
    const alldata = await dataModel.find({});
    console.log(alldata);
    
    if (!alldata){
        return res.status(400).json({
            error : "alldata is not found or empty"
        })
    }
    res.status(200).json({
        sucess : true,
        data : alldata,
        message : "get all datab form database"
    })
})
  
app.listen(3000, ()=>{
    console.log("server running");
})