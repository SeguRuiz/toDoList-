//Ctegorys functions
import {
  addCategorys,
  eliminateCategory,
  categoryFilters,
  showCategorys,
  maintain_Selected_Tag,
  category_Tag_Change,
  tagSelectors
} from "../js/extra_categorys";
//search functions
import {
  openSearch,
  searchThis,
  searchPreview,
  changeFilterIcon,
} from "../js/extra_SearchBar";
//submit events functions
import {
  addTasks,
  eliminateBtnFunction,
  checkboxesClick,
  editFormFunction,
  reflectTasks,
  editIconFunctions,
} from "./tasksFunctions";
//request functions
import { request, putRequest, requestPost } from "./requests";
//Classes
import {
  dataPost,
  DataPut,
  DataCheck,
  dataChange,
  dataFilter,
  dataCategory,
} from "./class_data";
//Variables globales
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
//fetch request
// post

//Cargar contenido
//agregar tareas
addTasks();
//hace post a la base de datos con el valor del input, {task: inputTask.value}

let showContent = (objectData) => {
  let contador = 0;
  let compara = 0;
  changeFilterIcon();
  openSearch(objectData);
  objectData.forEach((object) => {
    if (object.filtered == "no") {
      compara++;
      let sectionSelect = document.createElement("select");
      let editIcon = document.createElement("div");
      let icon = document.createElement("div");
      let checkBox = document.createElement("div");
      let text = document.createElement("p");
      let div = document.createElement("div");
      let divBtn = document.createElement("div");
      let divTask = document.createElement("div");
      text.innerHTML = object.task;
      sectionSelect.id = object.id;
      divBtn.id = object.id;
      checkBox.id = object.id;
      editIcon.id = object.id;
      divTask.id = text.innerHTML;
      text.id = object.id;
      sectionSelect.value = "none";
      sectionSelect.classList.add("select");
      tareas.push(text);
      selectors.push(sectionSelect);
      divsTasks.push(divTask);
      div.appendChild(checkBox);
      div.appendChild(sectionSelect);
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

      if (object.status == "checked") {
        contador++;
        countShow.innerHTML = "Tareas completadas: " + contador;
        checkBox.style.backgroundColor = "rgb(0, 110, 255)";
        checkBox.innerHTML =
          '<i class="fa-solid fa-check fa-sm" style="color: #ffffff;"></i>';
        checkBox.style.border = "none";
        divTask.style.opacity = "0.3";
      }

      eliminateBtnFunction(objectData, divBtn);
      /////////////////////////
      checkboxesClick(objectData, checkBox);
      ////////////////////////////////////
      ///////////////////////////////////////////////
      editIconFunctions(editIcon, text);

      searchThis(tareas, divTask, searchModal);

      searchPreview(tareas, divTask);

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
  tagSelectors(selectors, objectData, divsTasks);
  addCategorys();
};

export { putRequest, request, requestPost, showContent };

