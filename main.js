const express=require ("express");
const router = require("./router");
const app=express();
const port = 5000;
var cors = require('cors');


app.use(cors())
app.use(express.json())

app.use('/',router);
//app.use(express.static('public'))

//get data from Json and then send it to script and display it to HTML


app.listen(port,console.log("this server running on port",port))