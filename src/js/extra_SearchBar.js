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
/*Aqui estan cada una de las siquientes funciones:

(FUNCIONES EXTRA):

1.Abrir el modal input de busqueda y quitar el filtro de la busqueda (openSearch())

2.Aplicar el filtro de la busqueda (editIconFunctions())

3.Mostrar un preview de las busquedas (searchPreview())

4.Cambiar el icono de buscar a borrar filtro (changeFilterIcon())
*/

export let openSearch = (objectData) => {
//Recibe la data del servidor 
  searchbtn.addEventListener("click", () => {
//Agrega un evento de click al boton para abrir la busqueda
    objectData.forEach((tasks) => {
//Recorre la data del servidor 
      if (tasks.filtered == "yes") {
//Si ve que una de las tareas tiene un status filtered = yes (lo que significa que hay un filtro activo)
//Puede ser de busqueda o category
        let rewind = new dataFilter("no");
        putRequest(tasks.id, rewind);
//Hara un new dataFilter para cada tarea y cambiara su estado de filtro a no junto con putRequest
//Esto es para volver a ver todas las tareas sin el filtro del search o categorys
        localStorage.setItem("filterStatus", "no");
        localStorage.setItem("categoryInAction", "none");
//Cambiara el filterStatus a no y quitara las categorias activas colocanco none
        window.location.reload();
      } else {
        searchModal.showModal();
//si no hay ninguna tarea con filtro abrira el modal del buscador
      }
    });
  });
};

export let searchThis = (tasks, div, searchModal) => {
//Recibe un array que tiene todo el texto de las tareaas creadas, los div de esas tareas, y el modal del form search
  searchForm.addEventListener("submit", (o) => {
//Evento submit al form del search
    o.preventDefault();
    let valueInput = searchInput.value;
    let valueFiltered = valueInput.trim();
//Filtrar con .trim() para no aceptar valores en blanco
    if (valueFiltered == "") {
      searchModal.close();
//Si se sube algo en blanco se cerrara la busqueda
    } else {
      tasks.forEach((element) => {
//Revisa las tareas que fueron creadas en el array tareas
        if (
          element.innerHTML.includes(valueFiltered) == false &&
          div.id == element.innerHTML
        )
//le hara un .includes() a las tareas creadas y si el valor del input lo incluye es diferente a
//Alguna tarea y el id del div de esa tarea es igual a su contenido (para tomar esa tarea en especifico)
         {
          estadoFilter = true;
          div.style.display = "none";
          let filtered = new dataFilter("yes");
          putRequest(element.id, filtered);
          localStorage.setItem("filterStatus", "yes");
//Hara un put con new dataFilter a yes para cambiar el estado de las tareas diferentes a la
//Comparacion del search y que showContent() no las muestre
          window.location.reload();
        }
      });
    }
  });
};

export let searchPreview = (data, div) => {
//Toma el array de las tareas y el div de cada tarea creada
  searchInput.addEventListener("input", (o) => {
//Evento input al input para buscar
    let characters = o.target.value;
//Tomo el valor de las teclas que son tocadas
    data.forEach((element) => {
//Recorro las tareas creadas almacenas en tareas[]
      if (
        element.innerHTML.includes(characters) == false &&
        div.id == element.innerHTML
      ) 
//.includes() a las tareas mostrandoze y si alguna es diferente a lo que esta en el input en ese momento
      {
        div.style.display = "none";
//Ocultara el display de esa tarea y asi ocultara las tareas que no tengan esa coincidencia y solo dejara las que si lo cumplan
      }

      if (characters == "" && div.id == element.innerHTML) {
//Cuando no haya nada en el input mostrara denuevo todas las tareas 
        div.style.display = "flex";
      }
    });
  });
};


export let changeFilterIcon = () => {
  if (localStorage.getItem("filterStatus") == "yes") {
//Vera el localStorage del estdo del filtro y si hay un filtro activo
    searchbtn.innerHTML =
      '<i class="fa-solid fa-filter-circle-xmark fa-sm" style="color: #ffffff;"></i>';
//Cambiara su icono para indicar que su funcio es ahora quitar el filtro
  }
};



