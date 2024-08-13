const express = require('express')
const app = express()
// const dbUser = bpronobbiswasinfo
// const dbPass = rFWSHT6ghJs84EWG
// mongodb+srv://bpronobbiswasinfo:rFWSHT6ghJs84EWG@cluster0.xparo.mongodb.net/

app.get('/home', function (req, res) {
    res.send({
        "firstname": "pronob",
        "lastName": "biswas",
        "fullName": "pronobBiswas"
    })
  })
  
app.listen(3000, ()=>{
    console.log("server running");
})