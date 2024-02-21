//targetting the form input
let form = document.getElementById("form")
let input = document.getElementById("input")
let msg = document.getElementById("msg")
let posts=document.getElementById("posts")
let dDate=document.getElementById("dDate")
let dTime=document.getElementById("dTime")


async function getData(req,res)
 {
    try
    {
        const res = await fetch("http://localhost:3000")
        const data = await res.json();
        //console.log(data);
        data.map((item) => {
        console.log(`Todo : ${item.ToDo} & ID : ${item.ID}`)
        posts.innerHTML+=
        //place our html code here
        `
        <div>
        <p>${item.ToDo}</p>
        <p>${item.dDate}</p>
        <p>${item.dTime}</p>
        <span class="options">
        <i onClick="editPost('${item.ID}')" class="fas fa-edit"></i>
        <i onClick="deletePost('${item.ID}')" class="fas fa-trash-alt"></i>
        </span>
        </div>
        `
      })
    }
    catch (err)
    {console.log(err)}
 }
 getData()

//add eventListener that will response on submit button clicked
form.addEventListener("submit",(e)=>{
  //to prevent it refreshed by it self everytime we pressed submit
  e.preventDefault()
  //console.log("button clicked")
  CekForm()
})

//untuk pengecekan isi input ada ato tidak
 CekForm=()=>
 {
    console.log("tgl:",dDate.value);
    console.log("post",input.value);
  //kl tidak ada input
  if(dDate.value==="")
  {
    msg.innerHTML="please input the date"
  }
  else if(input.value==="")
  {
    msg.innerHTML="please input the information"
  }
  else if(dTime.value==="")
  {
    msg.innerHTML="please input time"
  }
  //kl ada input
  else
  {
    msg.innerHTML=""
    acceptData();
  }
 }

async function acceptData()
 { 
    try 
    {
        const res = await fetch ("http://localhost:3000", {
          method : "POST",
          body: JSON.stringify( {
            ToDo: document.getElementById("input").value,
            dDate:document.getElementById("dDate").value,
            dTime:document.getElementById("dTime").value
        }),
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
    const res = await fetch(`http://localhost:3000/${ID}`, {
      method: "DELETE"
    });
  } 
  catch (err) {
  console.log(err);
  }
}

async function editPost(ID)
{
  //input.value=ID.parentElement.previousElementSibling.innerHTML;
  console.log(ID);
  try {
    const res=await fetch(`http://localhost:3000/${ID}`,
    {
      method : "PUT",
      body : JSON.stringify({
        ToDo: document.getElementById("input").value}
      ), headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })}
  catch (err) {
    console.log(err);
  }
}