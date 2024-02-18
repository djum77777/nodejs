const express=require ("express");
const app=express();
const port = 3000;
const fs= require ('fs')
var cors = require('cors');

//random unique ID NPM
const { v4: uuidv4 } = require('uuid');

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
  //console.log("post",getData);
  //const newData=req.body //ambil isi body html dr request
  //console.log("added data",newData);
  let {ID,ToDo}=req.body
  ID=uuidv4();
  const newData=
    {
      ID,
      ToDo
    }
  //console.log("data baru",newData);
  getData.push(newData)
  console.log("post with new data",getData);
  fs.writeFileSync("todo.json",JSON.stringify(getData,null,2));
  res.send(getData) //untuk kirim data tersimpan
})

app.delete ("/:ID",(req,res)=>
{
  const Data=JSON.parse(fs.readFileSync("todo.json"));
  //newData menampung semua item di luar dari yg mau dihapus
  //pakai filter bkn find krn ambil smua data yg tidak ssuai ID yg dicari
  const newData=Data.filter((item)=>item.ID!==req.params.ID)

  const dataLength = Data.length;
  const newDataLength = newData.length;

  if (dataLength==newDataLength)
  {
    res.status(400).send("Data not found!!")
  }
  else{
  fs.writeFileSync("todo.json",JSON.stringify(newData,null,2))
  res.send(newData)
  }
})

app.put ("/:ID",(req,res)=>
{
  const curData=JSON.parse(fs.readFileSync("todo.json"))
  let status=0
  curData.map((item)=>
  {
    if (item.ID===req.params.ID)
    {
      item.ToDo=req.body.ToDo
      return status =1;
    }
  })
  
  if (status == 0)
  {
    console.log("tidak ada data");
    res.status(400).send("Data not found!!")
  }
  else
  {
    console.log(`ada data nya`);
    fs.writeFileSync("todo.json",JSON.stringify(curData,null,2))
    res.status(200).send(curData ) }
})

app.listen(port,console.log("this server running on port",port))