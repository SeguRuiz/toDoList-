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
  dataDelete,
  DataCheck,
  dataChange,
  dataFilter,
  dataCategory,
} from "./class_data";

import { request, putRequest, requestPost } from "./requests";

/*Aqui estan cada una de las siquientes funciones:
1.Agregar tareas (addtask())

2.Eliminar tareas (eliminateBtnFunction())

3.Checbox click and unclick (checkboxesClick())

(FUNCIONES EXTRA):

1.Editar las tareas existentes en al api (editFormFunction())

2.Mostrar el input modal para editar tareas (editIconFunctions())

3.Mostrar la edicion de la tarea en tiempo real (reflectTasks())
*/

//1.Agregar tareas (addtask())
export let addTasks = () => {
  formTask.addEventListener("submit", (m) => {
    /*agrego un evento submit al form que contiene
    el input para agregar tareas.
    
    formTask se encuentra en variables_Global.js*/
    m.preventDefault();
    //un preventDefault al evento para que no ocurra un reload.
    let espacios = inputTask.value;
    let filtrado = espacios.trim();
    //filtro el value del input  con .trim() para evitar que se acepten espacios en blanco.
    if (filtrado != "") {
      //si el valor del input es diferente a nada para no subir informacion en blanco.
      let Task = new dataPost("post", filtrado);
      //llamo al cosntructor de la class datapost con el metodo 'post' y el valor de la nueva tarea a subir.
      requestPost(Task);
      //llamo a requestPost para que reciba el nuevo objeto post. requestPost esta en request.js
      window.location.reload();
      //Un reload a la pagina para que showContent muestre la nueva tarea.
    } else {
      //si el valor del input es '' el placeholder sera 'ingrese texto'
      inputTask.placeholder = "Ingrese el texto";
    }
  });
};
addTasks();
//2.Eliminar tareas (eliminateBtnFunction())
export let eliminateBtnFunction = (data, eliminateBtns) => {
  //Recibe la data del api, los divs para eliminar creados,
  eliminateBtns.addEventListener("click", () => {
    //Les agrego un evento click a cada div creado
    data.forEach((task) => {
      //Recorro con un forEach data del servidor
      if (task.id == eliminateBtns.id) {
        /*Si el id de de la tarea en el servidor es igual al id de los div,
el id de los botones ya es igual al id de las tareas pero esto es para que agarre la tarea en especifico
y la elimine.
*/
        //llamo al constructor de la class dataDelete en una nueva variable para realizar un delete method
        let changeStatus = new dataDelete("delete");
        putRequest(eliminateBtns.id, changeStatus);
        /*llamo a putRequest() con el id del div (ya que es igual al de la tarea seleccionada) 
y con el objeto creado con la varible changeStatus*/
        window.location.reload();
        //Reload a la pagina pa que se muestre el array del servidor sin la tarea eliminada
      }
    });
  });
};

//3. Checbox click and unclick (checkboxesClick())
export let checkboxesClick = (data, checkboxes) => {
  //Recibe la data del servidor y los checkboxes creados
  checkboxes.addEventListener("click", () => {
    //Evento click a cada checkBox
    data.forEach((task) => {
      //Recorro la data del servidor con un forEach
      if (task.id == checkboxes.id) {
        //Si el id de la tarea en el servidor es igual al id de las checkBox. Para que agarre la tarea en especifico
        if (checkboxes.style.backgroundColor != "rgb(0, 110, 255)") {
          checkboxes.style.backgroundColor = "rgb(0, 110, 255)";
          //cambiara el color del checkBox si es diferente al indicado
          let checked = new DataCheck("put", "checked");
          //llamra a DataCheck para cambiar el status de la tarea a checked junto con putRequest
          putRequest(checkboxes.id, checked);
          window.location.reload();
          //Reload para mostrar el nuevo estado de la tarea
        } else {
          if (checkboxes.style.backgroundColor != "white") {
            //si el color del checkBox esta en check lo cambiara  blanco
            checkboxes.style.backgroundColor = "white";
            let unChecked = new DataCheck("put", "unChecked");
            //Llamara a DataCheck para para cambiar el status de esa tarea a unChecked junto con putRquest
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

//2.Mostrar el input modal para editar tareas (editIconFunctions())
export let editIconFunctions = (editIcon, text) => {
  //Recibe los divs para editar
  editIcon.addEventListener("click", () => {
    //Evento click para que habra el modal del input para editar
    modal.showModal();
    editFormFunction(editIcon.id);
    //el id de los iconos ya tiene el de cada tarea con el que fue creado
    reflectTasks(text);
    //Y llama a las funciones necesarias
  });
};

//1.Editar las tareas existentes en al api (editFormFunction())
export let editFormFunction = (id) => {
  //Recibe el id de las tareas en el servidor
  formEdit.addEventListener("submit", (m) => {
    //Evento submit al form para editar tareas
    m.preventDefault();

    let espacios = editInput.value;
    let filtrado = espacios.trim();
    ///filtro los valores del input con .trim() para que no acepte espacion en blanco
    if (filtrado != "") {
      let updatedTask = new dataChange(filtrado);
      putRequest(id, updatedTask);
      window.location.reload();
      /* 
si el valor del input es diferente a '', llamara a dataChange para cambiar el valor del esa tarea en especifico
agarrando el id de la tarea en especifico. 
*/
    } else {
      editInput.placeholder = "Ingrese el texto";
      window.location.reload();
      /*Si el valor del input es '' mostrara 'ingrese el texto' y se saldra del modal del input*/
    }
  });
};

//3.Mostrar la edicion de la tarea en tiempo real (reflectTasks())
export let reflectTasks = (text) => {
  //Recibe los p creados para cada tarea
  editInput.value = text.innerText;
  //el valor del input para editar lo igualo a la tarea en cuestion para que aparezca en el input
  editInput.addEventListener("input", (o) => {
    //Evento input al input para editar, ocurre cada que se toca una tecla
    let keys = o.target.value;
    //tomo el valor de cada tecla tocada en una variable
    text.innerText = keys;
    //Igualo el valor del p de la tarea a las teclas tocadas para que sea vea en tiempo real
  });
};
