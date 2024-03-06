const fs= require ('fs')
const dateFormat = require('date-and-time');

//random unique ID NPM
const { v4: uuidv4 } = require('uuid');

//db connection
const knex = require ('../db/knex')

exports.getdata=async(req,res)=>
{
  let data = await knex.select().table('todo')
  //console.log('data server',data);
  res.status(200).json(data)
}

exports.postdata=async(req,res)=>
{
  let {todo,ddate,dtime}=req.body
  console.log('isi insert data',req.body);
  const getData=await knex('todo').insert(req.body)
  const dataUpdate=await knex.select().table('todo')
  res.send(dataUpdate) //untuk kirim data tersimpan
}

exports.deletedata=async(req,res)=>
{
  const delID=req.params.ID
  //console.log('del ID',delID);
  let delData=await knex('todo')
  .where('id', delID)
  .del()
  const dataUpdate=await knex.select().table('todo')
  res.send(dataUpdate) //untuk kirim data tersimpan
}

exports.editdata=async(req,res)=>
{
const id=Number(req.params.ID)
console.log("editdata cek id",id);
console.log('data gnti',typeof(req.body));
const curData=await knex('todo').where('id',id).update(req.body)
console.log('isi curdata',curData);
res.send('test')
}