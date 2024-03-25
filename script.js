//targetting the form input
let form = document.getElementById("form");
let input = document.getElementById("input");
let msg = document.getElementById("msg");
let posts = document.getElementById("posts");
let dDate = document.getElementById("dDate");
let dTime = document.getElementById("dTime");
let reminder = document.getElementById("reminder");
let isEdit = false;
let IDGlobal;

async function getData(req, res) {
  try {
    const res = await fetch("http://localhost:5000");
    const data = await res.json();
    data.map((item) => {
      //console.log(`Todo : ${item.todo} & ID : ${item.id}`)
      posts.innerHTML +=
        //place our html code here
        `
      <table>
      <tr>
      <td>${item.todo}</td>
      <td>${item.ddate}</td>
      <td>${item.dtime}</td>
      <td><span class="options">
      <i onClick="editPost('${item.id}')" title="edit" class="fas fa-edit"></i>
      <i onClick="deletePost('${item.id}')" title="delete" class="fas fa-trash-alt"></i>
      </span></td>
      <td id="reminder">${item.reminder}</td>
      </table>
      `;
    });
  } catch (err) {
    console.log(err);
  }
}
getData();
//document.getElementById("foot").style.color = "red";
//add eventListener that will response on submit button clicked
form.addEventListener("submit", (e) => {
  //to prevent it refreshed by it self everytime we pressed submit
  e.preventDefault();
  console.log("button click cek is edit", isEdit);
  if (isEdit) {
    console.log(isEdit);
    console.log(IDGlobal);
    editPost2(IDGlobal);
  } else {
    CekForm();
    isEdit = false;
  }
});
//untuk pengecekan isi input ada ato tidak
CekForm = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0]; //kl tidak ada input
  if (input.value === "") {
    msg.innerHTML = "Attention : please input the information";
  } else if (dDate.value < formattedDate) {
    msg.innerHTML = "Attention : Due date cannot smaller than current date";
  } else if (dDate.value === "") {
    msg.innerHTML = "Attention : please input the date";
  } else if (dTime.value === "") {
    msg.innerHTML = "Attention : please input time";
  } else {
    msg.innerHTML = "";
    acceptPost();
  }
};
async function acceptPost() {
  try {
    const savePost = {
      todo: document.getElementById("input").value,
      ddate: document.getElementById("dDate").value,
      dtime: document.getElementById("dTime").value,
    };
    const res = await fetch("http://localhost:5000", {
      method: "POST",
      body: JSON.stringify(savePost),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    input.value = "";
  } catch (err) {
    console.log(err);
  }
  window.location.reload();
}
async function deletePost(ID) {
  //console.log(ID);
  try {
    console.log("data ID yg dihapus", ID);
    const res = await fetch(`http://localhost:5000/${ID}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.log(err);
  }
  window.location.reload();
}
async function editPost(ID) {
  //tampung data untuk tampilin di html value yg mau diedit
  const res = await fetch("http://localhost:5000");
  const data = await res.json();
  console.log("edit data", data);
  console.log("id", ID);
  //const tampung =[];
  data.find((item) => {
    if (item.id == ID) {
      const tampung = item;
      input.value = tampung.todo;
      dDate.value = tampung.ddate;
      dTime.value = tampung.dtime;
      isEdit = true;
      IDGlobal = ID;
    }
  });
}
async function editPost2(ID) {
  try {
    console.log("data ID yg diedit", ID);
    const edit = {
      todo: document.getElementById("input").value,
      ddate: document.getElementById("dDate").value,
      dtime: document.getElementById("dTime").value,
    };
    const res = await fetch(`http://localhost:5000/${ID}`, {
      method: "PUT",
      body: JSON.stringify(edit),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  } catch (err) {
    console.log(err);
  }
  window.location.reload();
}
