const fs= require ('fs')
const format=require('date.format');

//random unique ID NPM
const { v4: uuidv4 } = require('uuid');

//db connection with knexfile.js
const knexfile=require('../knexfile')
const knex = require('knex')(knexfile.development)

exports.getdata=async(req,res)=>
{
  //make the order by due date ascending
  let data = (await knex.select().table('todo').orderBy('ddate','asc'))
  //console.log('server',data);
  const mydata=[]
  data.forEach(item => {
    const date=item.ddate
    const tgl=date.format("{YYYY}-{MM}-{DD}");
    const tampung={
      id:item.id,
      todo:item.todo,
      ddate:tgl,
      dtime:item.dtime,
      reminder:item.reminder

    }
    mydata.push(tampung)
  });
  //console.log(mydata);
  res.status(200).json(mydata)
}

exports.postdata=async(req,res)=>
{
  let {todo,ddate,dtime}=req.body
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  //console.log(formattedDate); // Example output: "2024-03-10"
  // reminder =0 if today is the due date, 1=if far from duedate, -1 = if passed duedate
  let reminder=0;
  if (ddate==formattedDate)
  {
    console.log(`Due date is today : ${ddate} vs ${formattedDate}`);
    reminder="duedate"
  }
  else if (ddate>formattedDate)
  {
    console.log(`due date still days to go: ${ddate} vs ${formattedDate}`);
    reminder="days to go"
  }
  else
  {
    console.log(`passed the date ${ddate} vs ${formattedDate}`);
    reminder="overdue"
  }
  const tampung={
    todo:todo,
    ddate:req.body.ddate,
    dtime:req.body.dtime,
    reminder:reminder
  }
  console.log('isi data',tampung);
  const getData=await knex('todo').insert(tampung)
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