//Imports
import {
  dataPost,
  DataPut,
  DataCheck,
  dataChange,
  dataFilter,
} from "../js/class_data";
import {
  formTask,
  inputTask,
  countShow,
  showTasksDiv,
  modal,
  formEdit,
  editInput,
  searchModal,
  searchbtn,
  tareas,
  searchInput,
  searchForm,
  estadoFilter,
} from "../js/variables";
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
  } catch (error) {
    console.log(error);
  }
};
//hace post a la base de datos con el valor del input, {task: inputTask.value}
formTask.addEventListener("submit", (m) => {
  m.preventDefault();
  let espacios = inputTask.value;
  let filtrado = espacios.trim();

  if (filtrado != "") {
    let Task = new dataPost("post", filtrado);
    requestPost(Task);
    window.location.reload();
  } else {
    inputTask.placeholder = "Ingrese el texto";
  }
});

let showContent = (objectData) => {
  let contador = 0;
  let compara = 0;

  openSearch(objectData);
  objectData.forEach((object) => {
    if (object.filtered == "no") {
      compara++;
      let editIcon = document.createElement("div");
      let icon = document.createElement("div");
      let checkBox = document.createElement("div");
      let text = document.createElement("p");
      let div = document.createElement("div");
      let divBtn = document.createElement("div");
      let divTask = document.createElement("div");
      text.innerHTML = object.task;
      divBtn.id = object.id;
      checkBox.id = object.id;
      editIcon.id = object.id;
      divTask.id = text.innerHTML;
      text.id = object.id;
      tareas.push(text);
      if (object.status == "checked") {
        contador++;
        countShow.innerHTML = "Tareas completadas: " + contador;
        checkBox.style.backgroundColor = "rgb(0, 110, 255)";
        checkBox.innerHTML =
          '<i class="fa-solid fa-check fa-sm" style="color: #ffffff;"></i>';
        checkBox.style.border = "none";
        divTask.style.opacity = "0.3";
      }
      div.appendChild(checkBox);
      div.appendChild(text);
      div.appendChild(editIcon);
      divBtn.appendChild(icon);
      icon.innerHTML =
        '<i class="fa-solid fa-trash fa-sm" style="color: #ffffff;"></i>';
      editIcon.innerHTML =
        '<i class="fa-solid fa-pen-to-square" style="color: #006eff;"></i>';
      icon.classList.add("icon");
      checkBox.classList.add("checkBox");
      div.classList.add("taskDivs");
      divTask.classList.add("tasks");
      divBtn.classList.add("divBtn");
      editIcon.classList.add("editTask");
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
      ///////////////////////////////////////////////
      editIcon.addEventListener("click", () => {
        modal.showModal();
        editFormFunction(editIcon.id);
        reflectTasks(text);
      });

      searchThis(tareas, divTask, searchModal);
      testSearch(tareas, divTask);
      //text event
    }
  });

  if (compara === 0) {
    showTasksDiv.innerHTML = "No hay tareas";
    showTasksDiv.style.display = "flex";
    showTasksDiv.style.justifyContent = "center";
    showTasksDiv.style.alignItems = "center";
    showTasksDiv.style.fontSize = "40px";
  }
};

///////////////////////////////////////////////////////////
let editFormFunction = (id) => {
  formEdit.addEventListener("submit", (m) => {
    m.preventDefault();
    let espacios = editInput.value;
    let filtrado = espacios.trim();

    if (filtrado != "") {
      let updatedTask = new dataChange(filtrado);
      putRequest(id, updatedTask);
      window.location.reload();
    } else {
      editInput.placeholder = "Ingrese el texto";
      window.location.reload();
    }
  });
};

let reflectTasks = (text) => {
  editInput.value = text.innerText;
  editInput.addEventListener("input", (o) => {
    let s = o.target.value;
    text.innerText = s;
  });
};

let openSearch = (objectData) => {
  searchbtn.addEventListener("click", () => {
    objectData.forEach((tasks) => {
      if (tasks.filtered == "yes") {
        let rewind = new dataFilter("no");
        putRequest(tasks.id, rewind);
        window.location.reload();
      } else {
        searchModal.showModal();
      }
    });
  });
};

let searchThis = (tasks, div, searchModal, object) => {
  searchForm.addEventListener("submit", (o) => {
    o.preventDefault();

    let valueInput = searchInput.value;
    let valueFiltered = valueInput.trim();

    if (valueFiltered == "") {
      searchModal.close();
    } else {
      tasks.forEach((element) => {
        if (
          element.innerHTML.includes(valueFiltered) == false &&
          div.id == element.innerHTML
        ) {
          estadoFilter = true;
          div.style.display = "none";
          let filtered = new dataFilter("yes");
          putRequest(element.id, filtered);
          window.location.reload();
        }
      });
    }
  });
};

let nombre = "hola";
console.log(nombre.includes("r"));

let testSearch = (data, div) => {
  searchInput.addEventListener("input", (o) => {
    let characters = o.target.value;
    data.forEach((element) => {
      if (
        element.innerHTML.includes(characters) == false &&
        div.id == element.innerHTML
      ) {
        div.style.display = "none";
        //  estadoFilter = true;
        //   div.style.display = "none";
        //   let filtered = new dataFilter("yes");
        //   putRequest(element.id, filtered);
      }

      if (characters == "" && div.id == element.innerHTML) {
        div.style.display = "flex";
      }
    });
  });
};
