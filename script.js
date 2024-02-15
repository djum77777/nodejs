//targetting the form input
let form = document.getElementById("form")
let input = document.getElementById("input")
let msg = document.getElementById("msg")
let posts=document.getElementById("posts")

async function getData(req,res)
 {
    try
    {
        const res = await fetch("http://localhost:3000")
        const data = await res.json();
        data.map((item) => {
        console.log(item);
        posts.innerHTML+=
        //place our html code here
        `
        <div>
        <p>${item.ToDo}</p>
        <span class="options">
        <i onClick="editPost(this)" class="fas fa-edit"></i>
        <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
        </span>
        </div>
        `})  
    }
    catch (err)
    {console.log(err);}
 }
 getData();

//add eventListener that will response on submit button clicked
form.addEventListener("submit",(e)=>{
  //to prevent it refreshed by it self everytime we pressed submit
  e.preventDefault()
  console.log("button clicked");
  CekForm()
})

//untuk pengecekan isi input ada ato tidak
 CekForm=()=>
 {
  //kl tidak ada input
  if(input.value==="")
  {
    msg.innerHTML="please input the text"
    console.log("mesti isi data");
  }
  //kl ada input
  else
  {
    msg.innerHTML=""
    console.log("data terisi");
    acceptData();
  }
 }

async function acceptData()
 {
    
    try 
    {
        //const isiID= await res.json()
        //const nomorID=isiID.length+1
        const res = await fetch ("http://localhost:3000", {
          method : "POST",
          body: JSON.stringify( {
            ToDo: document.getElementById("input").value
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        })
        data=input.value;
        postData() 
    }
    catch(err)
    {
        console.log(err);
    }
 }

 let postData=()=>
 {
    posts.innerHTML+=
    //place our html code here
    `
    <div>
    <p>${data}</p>
    <span class="options">
    <i onClick="editPost(this)" class="fas fa-edit"></i>
    <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
    </span>
    </div>
    `
    //make the text area blank everytime we post/stored data
    input.value=""
 }

async function deletePost(e)
{
 //we delete 2 tier above
 try {
  const res = await fetch(`http://localhost:3000/${e}`, {
      method: "DELETE"
    });
  } 
  catch (err) {
  console.log(err);
  };
 e.parentElement.parentElement.remove();
}

let editPost=(e)=>
{
  //everytime we click on edit it will return the previous text to the input text area
  input.value=e.parentElement.previousElementSibling.innerHTML;
  //and then we delete the line that we want to edit and click post it with the new one
  e.parentElement.parentElement.remove(); 
}