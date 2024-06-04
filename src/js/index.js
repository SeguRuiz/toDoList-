//Imports
import { dataPost, DataPut, DataCheck } from "../js/class_data";
import { formTask, inputTask, countShow, showTasksDiv, } from "../js/variables";
//fetch request
let linkData = "http://localhost:3000/api/task/";
// post
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
let putRequest = async (thisId, deleteThis) => {
  try {
    let response = await fetch(linkData + thisId, deleteThis);
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
//hace post a la base de datos con el valor del input, {task: inputTask.value}
formTask.addEventListener("submit", (m) => {
  m.preventDefault();
  let espacios = inputTask.value
  let filtrado = espacios.trim()
  
  if (filtrado != "") {
    let Task = new dataPost("post", filtrado);
    requestPost(Task);
    window.location.reload();
  } else {
    inputTask.placeholder = "Alguna cosa pendiente?";
  }
});

let showContent = (objectData) => {
  let contador = 0;
  let compara = 0;

  objectData.forEach((object) => {
    compara++;
    let icon = document.createElement("div");
    let checkBox = document.createElement("div");
    let text = document.createElement("p");
    let div = document.createElement("div");
    let divBtn = document.createElement("div");
    let divTask = document.createElement("div");
    text.innerHTML = object.task;
    divBtn.id = object.id;

    checkBox.id = object.id;
    if (object.status == "checked") {
      contador++;
      countShow.innerHTML = "Tareas completadas: " + contador;
      checkBox.style.backgroundColor = "rgb(0, 110, 255)";
      checkBox.innerHTML =
        '<i class="fa-solid fa-check fa-sm" style="color: #ffffff;"></i>';
      checkBox.style.border = "none";
      divTask.style.opacity = '0.3'
    }
    div.appendChild(checkBox);
    div.appendChild(text);
    divBtn.appendChild(icon);
    icon.innerHTML =
      '<i class="fa-solid fa-trash fa-sm" style="color: #ffffff;"></i>';
    icon.classList.add("icon");
    checkBox.classList.add("checkBox");
    div.classList.add("taskDivs");
    divTask.classList.add("tasks");
    divBtn.classList.add("divBtn");
    divTask.appendChild(div);
    divTask.appendChild(divBtn);
    document.getElementById("inProgres").appendChild(divTask);

    /////////////////////////
    divBtn.addEventListener("click", () => {
      objectData.forEach((task) => {
        if (task.id == divBtn.id) {
          console.log(divBtn.id);
          let changeStatus = new DataPut("delete");
          putRequest(divBtn.id, changeStatus);
          window.location.reload();
        }
      });
    });
    ////////////////////////////////////
    checkBox.addEventListener("click", () => {
      objectData.forEach((task) => {
        if (task.id == checkBox.id) {
          if (checkBox.style.backgroundColor != "rgb(0, 110, 255)") {
            checkBox.style.backgroundColor = "rgb(0, 110, 255)";
            let checked = new DataCheck("put", "checked");

            putRequest(checkBox.id, checked);
            window.location.reload();
          } else {
            if (checkBox.style.backgroundColor != "white") {
              checkBox.style.backgroundColor = "white";
              let unChecked = new DataCheck("put", "unChecked");
              putRequest(checkBox.id, unChecked);
              checkBox.innerHTML = "";
              window.location.reload();
            }
          }
        }
      });
    });

    //text event
  });
  if (compara === 0) {
    showTasksDiv.innerHTML = "No hay tareas";
    showTasksDiv.style.display = "flex";
    showTasksDiv.style.justifyContent = "center";
    showTasksDiv.style.alignItems = "center";
    showTasksDiv.style.fontSize = "40px";
  }
};
