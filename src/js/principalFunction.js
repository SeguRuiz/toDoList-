//Ctegorys functions
import {
  addCategorys,
  eliminateCategory,
  categoryFilters,
  showCategorys,
  maintain_Selected_Tag,
  category_Tag_Change,
  tagSelectors,
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
  countShow,
  showTasksDiv,
  searchModal,
  tareas,
  selectors,
  divsTasks,
} from "./variables_Global";

/*
Aqui se encuentra la funcion principal showContent() le digo asi porque es la que toma
la data del servidor la cual es utilizada por muchas otras funciones que son llamadas dentro
de showContent().
*/

let showContent = (objectData) => {
  let contador = 0;
  let Showing_Tasks = 0;
//Contadores para verificar si hay tareas disponibles en el servidor
  changeFilterIcon();
// La funcion changeFilterIcon() esta explicada en extra_SearchBar.js
  openSearch(objectData);
  objectData.forEach((object) => {
    if (object.filtered == "no") {
//Solo mostrara/creara las tareas si su estado de filtro es no
//Esto me resulta util para las funciones de search bar y categorias
      Showing_Tasks++;
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
      divTask.id = object.id;
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
//Creo etiquetas en div/p/select/ para cada tareas y les agrego clases para cambiar sus estilos
//Igualo sus ids para tener control a cual tarea pertenece cada etiqueta creada y utilizarlo en demas validaciones
//que ocupen referirse a una tarea en especifo
      if (object.status == "checked") {
//Valido el status de cada tarea, si el status de esa tarea e checked 
//Cambiara el estilo de su checkBox y su opacidad
//Y sumara al contador de checkeds
        contador++;
        countShow.innerHTML = "Tareas completadas: " + contador;
        checkBox.style.backgroundColor = "rgb(0, 110, 255)";
        checkBox.innerHTML =
          '<i class="fa-solid fa-check fa-sm" style="color: #ffffff;"></i>';
        checkBox.style.border = "none";
        divTask.style.opacity = "0.3";
      }

      eliminateBtnFunction(objectData, divBtn);
//eliminateBtnFunction() esta explicada en taskFunctions.js
      checkboxesClick(objectData, checkBox);
//checkboxesClick() esta explicada en taskFunctions.js
      editIconFunctions(editIcon, text);
//editIconFunctions() esta explicada en taskFunctions.js
      searchThis(tareas, divTask, searchModal);
//searchThis() esta explicada en extra_Searchbar.js
      searchPreview(tareas, divTask);
//searchPreview() esta explicada en extra_Searchbar.js
    }
  });

  tagSelectors(selectors, objectData, divsTasks);
//tagSelectors() esta explicada en extra_Searchbar.js

  if (objectData.length === 0 || Showing_Tasks === 0) {
//Comprueba el largo del array de las tareas en el servidor y si es 0
//que es el caso en que no hay tareas, mostrara 'No hay tareas'
    showTasksDiv.innerHTML = "No hay tareas";
    showTasksDiv.style.display = "flex";
    showTasksDiv.style.justifyContent = "center";
    showTasksDiv.style.alignItems = "center";
    showTasksDiv.style.fontSize = "40px";
  }
};

export { putRequest, request, requestPost, showContent };
