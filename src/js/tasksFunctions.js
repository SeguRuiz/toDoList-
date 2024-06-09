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
  option,
  categoryForm,
  categoryInput,
  categoryModal,
  openCategory,
  categoryStorage,
  selectors,
  tagsContainer,
  divsTasks,
  linkData,
} from "./variables_Global";

import {
  dataPost,
  DataPut,
  DataCheck,
  dataChange,
  dataFilter,
  dataCategory,
} from "./class_data";

import { request, putRequest, requestPost } from "./requests";

//Encargada de agregar tareas
export let addTasks = () => {
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
};
//eliminar
export let eliminateBtnFunction = (data, eliminateBtns) => {
  eliminateBtns.addEventListener("click", () => {
    data.forEach((task) => {
      if (task.id == eliminateBtns.id) {
        console.log(eliminateBtns.id);
        let changeStatus = new DataPut("delete");
        putRequest(eliminateBtns.id, changeStatus);
        window.location.reload();
      }
    });
  });
};
//check
export let checkboxesClick = (data, checkboxes) => {
  checkboxes.addEventListener("click", () => {
    data.forEach((task) => {
      if (task.id == checkboxes.id) {
        if (checkboxes.style.backgroundColor != "rgb(0, 110, 255)") {
          checkboxes.style.backgroundColor = "rgb(0, 110, 255)";
          let checked = new DataCheck("put", "checked");

          putRequest(checkboxes.id, checked);
          window.location.reload();
        } else {
          if (checkboxes.style.backgroundColor != "white") {
            checkboxes.style.backgroundColor = "white";
            let unChecked = new DataCheck("put", "unChecked");
            putRequest(checkboxes.id, unChecked);
            checkboxes.innerHTML = "";
            window.location.reload();
          }
        }
      }
    });
  });
};

// EXTRA EDIT FUNCTIONs

export let editIconFunctions = (editIcon, text) => {
  editIcon.addEventListener("click", () => {
    modal.showModal();
    editFormFunction(editIcon.id);
    reflectTasks(text);
  });
};

export let editFormFunction = (id) => {
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

export let reflectTasks = (text) => {
  editInput.value = text.innerText;
  editInput.addEventListener("input", (o) => {
    let s = o.target.value;
    text.innerText = s;
  });
};
