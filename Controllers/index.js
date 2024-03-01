const fs= require ('fs')
const dateFormat = require('date-and-time');


//random unique ID NPM
const { v4: uuidv4 } = require('uuid');

//db connection
const knex = require ('../db/knex')

exports.getdata=async(req,res)=>
{
  let data = await knex.select().table('todo')
  console.log('data server',data);
  res.status(200).json(data)
  //console.log(data);
}

exports.postdata=async(req,res)=>
{
  let {todo,ddate,dtime}=req.body
  console.log(req.body);
  const getData=await knex('todo').insert(req.body)
  const dataUpdate=await knex.select().table('todo')

  res.send(dataUpdate) //untuk kirim data tersimpan
}

exports.deletedata=(req,res)=>
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
}

exports.editdata=(req,res)=>
{
  const curData=JSON.parse(fs.readFileSync("todo.json"))
  console.log(req.params.ID);
  let status=0
  curData.map((item)=>
  {
    if (item.ID===req.params.ID)
    {
      item.ToDo=req.body.ToDo
      item.dDate=req.body.dDate
      item.dTime=req.body.dTime
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
}