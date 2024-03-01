//targetting the form input
let form = document.getElementById("form")
let input = document.getElementById("input")
let msg = document.getElementById("msg")
let posts=document.getElementById("posts")
let dDate=document.getElementById("dDate")
let dTime=document.getElementById("dTime")
let isEdit=false;
let IDGlobal;

async function getData(req,res)
 {
    try
    {
      const res = await fetch("http://localhost:5000")
      const data = await res.json();
      
      const DueDate = new Date(data[1].ddate);
      let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(DueDate);
      let month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(DueDate);
      let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(DueDate);
      console.log(`${year}-${month}-${day}`);
      
      data.forEach((item) => {

        console.log(`Todo : ${item.todo} & ID : ${item.ddate}`)
        posts.innerHTML+=
        //place our html code here
        `
        <table>
        <tr>
        <td>${item.todo}</td>
        <td>${item.ddate}</td>
        <td>${item.dtime}</td>
        <td><span class="options">
        <i onClick="editPost('${item.ID}')" title="edit" class="fas fa-edit"></i>
        <i onClick="deletePost('${item.ID}')" title="delete" class="fas fa-trash-alt"></i>
        </span></td>
        </table>
        `
      });
    }
    catch (err)
    {console.log(err)}
 }
 getData()
//add eventListener that will response on submit button clicked
form.addEventListener("submit",(e)=>{
  //to prevent it refreshed by it self everytime we pressed submit
  e.preventDefault()
  console.log("button click cek is edit",isEdit);
  if(isEdit)
  {
    editPost2(IDGlobal)
  }
  else{
   CekForm()
  isEdit=false}
  })

//untuk pengecekan isi input ada ato tidak
 CekForm=()=>
 {
  //kl tidak ada input
  if(input.value==="")
  {
    msg.innerHTML="Attention : please input the information"
  }
  else if(dDate.value==="") 
  {
    msg.innerHTML="Attention : please input the date"
  }
  else if(dTime.value==="") 
  {
    msg.innerHTML="Attention : please input time"
  }
  else
  {
    msg.innerHTML=""
    acceptPost();
  }
 }

async function acceptPost()
 { 
    try 
    {
      const savePost=
      {
        todo: document.getElementById("input").value,
        ddate:document.getElementById("dDate").value,
        dtime:document.getElementById("dTime").value }
      const res = await fetch ("http://localhost:5000", {
        method : "POST",
        body: JSON.stringify(savePost),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
        })
        input.value=""
    }
    catch(err)
    {
        console.log(err);
    }
 }

async function deletePost(ID)
{
  console.log(ID);
  try {
    console.log("data ID yg dihapus",ID);
    const res = await fetch(`http://localhost:5000/${ID}`, {
      method: "DELETE"
    });
  } 
  catch (err) {
  console.log(err);
  }
}

async function editPost(ID)
{
  const res = await fetch("http://localhost:5000") 
  const data = await res.json();
  const tampung =[];
  data.find((item) =>{
    if (item.ID==ID)
    {
      const tampung=item
      input.value =tampung.ToDo
      dDate.value=tampung.dDate
      dTime.value=tampung.dTime
      isEdit=true;
      IDGlobal=ID;
    }
  })
}

async function editPost2(ID)
{
  try {
    const res=await fetch(`http://localhost:5000/${ID}`,
    {
      method : "PUT",
      body : JSON.stringify({
        ToDo: document.getElementById("input").value,
        dDate:document.getElementById("dDate").value,
        dTime:document.getElementById("dTime").value

      }
      ), headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
  }
  catch (err) {
    console.log(err);
  }
}