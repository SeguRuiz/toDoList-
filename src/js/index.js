//Imports
import { dataPost, DataPut } from "../js/class_data";
import { formTask, inputTask, test, body } from "../js/variables";
//fetch request
let linkData = "http://localhost:3000/api/task/";
let requestPost = async (dataObject) => {
  try {
    let response = await fetch(linkData, dataObject);
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
let request = async () => {
  try {
    let response = await fetch(linkData);
    let data = await response.json();
    console.log(data);
    showContent(data);
  } catch (error) {
    console.log(error);
  }
};
//Cargar contenido
request();
let putRequest = async (thisId, putThis) => {
  try {
    let response = await fetch(linkData + thisId, putThis);
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
//hace post a la base de datos con el valor del input, {task: inputTask.value}
formTask.addEventListener("submit", (m) => {
  m.preventDefault();
  if (inputTask.value != "") {
    let Task = new dataPost("post", inputTask.value);
    requestPost(Task);
    window.location.reload();
  } else {
    inputTask.placeholder = "Alguna cosa pendiente?";
  }
});

let showContent = (objectData) => {
  objectData.forEach((object) => {
    if (object.status === "show") {
      let icon = document.createElement("div")
      let checkBox = document.createElement("input");
      let text = document.createElement("p");
      let div = document.createElement("div");
      let divBtn = document.createElement("div");
      let divTask = document.createElement("div");
      checkBox.type = "checkbox";
      text.innerHTML = object.task;
      divBtn.id = object.id;
      div.appendChild(checkBox);
      div.appendChild(text);
      divBtn.appendChild(icon)
      icon.innerHTML = '<i class="fa-solid fa-trash fa-sm" style="color: #ffffff;"></i>'
      icon.classList.add("icon")
      checkBox.classList.add("checkBox");
      div.classList.add("taskDivs");
      divTask.classList.add("tasks");
      divBtn.classList.add("divBtn");
      divTask.appendChild(div);
      divTask.appendChild(divBtn);
      document.getElementById("inProgres").appendChild(divTask);
      divBtn.addEventListener("click", () => {
        objectData.forEach((task) => {
          if (task.id == divBtn.id) {
            let changeStatus = new DataPut("put", "hide");
            putRequest(divBtn.id, changeStatus);
            window.location.reload();
          }
        });
      });
    }
    //text event
  });
};



// let fetch = async () =>{
// try {
// let response = await fetch(linkData) 
// let datos = await response.json()
// console.log(datos);

// } catch (error) {
//   console.log(error);
// }
// }

// let objeto = {
// method:'post',
// headers:{
//   'Content-Type': 'application/json'
// },
// body:JSON.stringify({
//   tarea: 'hice la tarea'
// })
 
// } 