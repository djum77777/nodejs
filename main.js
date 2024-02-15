const express=require ("express");
const app=express();
const port = 3000;
const fs= require ('fs')
var cors = require('cors');

app.use(express.json())
app.use(cors())

//get data from Json and then send it to script and display it to HTML
app.get("/",(req,res)=>
{
  let data = JSON.parse(fs.readFileSync("todo.json"))
  res.send(data)
  //console.log(data);
})

app.post("/",(req,res)=>
{
  const getData=JSON.parse(fs.readFileSync("todo.json")); 
  console.log("post",getData);
  const newData=req.body //ambil isi body html dr request
  getData.push(newData)
  console.log("post with new data",getData);
  fs.writeFileSync("todo.json",JSON.stringify(getData,null,2));
  res.send(getData) //untuk kirim data tersimpan
})

app.delete ("/",(req,res)=>
{
  const Data=JSON.parse(fs.readFileSync("todo.json"));
  const newData=Data.filter((item)=>{item.ToDo!==req.params.input})
  Data.push(newData)
  console.log("delete Data",Data);
  fs.writeFileSync("todo.json",JSON.stringify(Data,null,2))
  res.send(Data)
})

 app.listen(port,console.log("this server running on port",port))