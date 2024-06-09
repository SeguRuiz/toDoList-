import { putRequest } from "./requests";
//Classes
import { dataFilter, dataCategory } from "./class_data";
//Variables globales
import {
  categoryForm,
  categoryInput,
  categoryModal,
  openCategory,
  categoryStorage,
  tagsContainer,
} from "./variables_Global";
/*
Aqui estan cada una de las siquientes funciones:

(FUNCIONES EXTRA):

1.Agregar categorias (addCategorys())

2.Mostras las categorias creadas (showCategorys())

3.Eliminar las categorias creadas (eliminateCategory())

4.Filtrar las tareas que tengan la categorias seleccionadas (categoryFilters())

5.Cada tarea mantenga su categoria seleccionada (maintain_Selected_Tag())

6.Al cambiar la categoria de alguna tarea esto se refleje en el servidor (category_Tag_Change())

7.Mostrar cada una de las categorias en el select de cada tarea (tagSelectors())
*/

//1.Agregar categorias (addCategorys())
export let addCategorys = () => {
  openCategory.addEventListener("click", () => {
    //Evento click para abrir el modal del  input de las categorias
    categoryModal.showModal();
  });

  categoryForm.addEventListener("submit", (x) => {
    //Evento submit al form de las categorias
    x.preventDefault();
    let value = categoryInput.value;
    let valueFiltered = value.trim();
    //Filtrar el valor del input con .trim() para no aceptar espacios en blanco
    if (valueFiltered == "") {
      categoryModal.close();
      //Si el valor del input es '' cerrara el modal del input par las categorias
    } else {
      if (valueFiltered != "") {
        //Si el valor del input es diferente a nada entonces subira la categoria agregada al array de categoryStorage
        //Y luego hara un set item en el localStorage con las categorias creadas
        categoryStorage.push(valueFiltered);
        localStorage.setItem("categorys", JSON.stringify(categoryStorage));
        window.location.reload();
      }
    }
  });
};
addCategorys();

//2.Mostras las categorias creadas (showCategorys())
export let showCategorys = (divsTask, data) => {
  //Recibe los un array que contiene los divs de cada tarea creada  y la data del servidor
  categoryStorage.forEach((tag) => {
    //Recorre las categorias creadas en el local storage
    let tagDiv = document.createElement("div");
    let tagDivText = document.createElement("div");
    let tagEliminate = document.createElement("div");
    tagEliminate.innerHTML =
      '<i class="fa-solid fa-trash fa-lg" style="color: #ffffff;"></i>';
    let tagText = document.createElement("p");
    tagDiv.classList.add("tagDiv");
    tagEliminate.classList.add("tagEliminate");
    tagText.classList.add("tagText");
    tagDivText.classList.add("tagDivText");
    tagText.innerHTML = tag;
    tagEliminate.id = tag;
    tagDivText.id = tag;
    tagDiv.id = tag;
    tagDivText.appendChild(tagText);
    tagDiv.appendChild(tagDivText);
    tagDiv.appendChild(tagEliminate);
    tagsContainer.appendChild(tagDiv);
    //Por cada categoria en el local hara create elements de cada elemento visual que haya nombrad
    //Tambien defini el id que seran iguales a las categorias en cuestion para control
    //Y les defini clases para cambiar sus estilos
    if (
      tagDiv.id != localStorage.getItem("categoryInAction") &&
      localStorage.getItem("categoryInAction") != "none"
    ) {
      tagDiv.style.opacity = "0.3";
    }
    //Para mostrar la categoria seleccionada hice una comprobacion que ve si la categoria es diferente a la activa
    //en el local y si no hay niguna categoria activa, hara que las categorias no activas tengan una opacidad menor

    eliminateCategory(tagEliminate);

    tagDivText.addEventListener("click", () => {
      categoryFilters(data, tagDivText.id, divsTask);
    });
  });
};

//3.Eliminar las categorias creadas (eliminateCategory())
export let eliminateCategory = (tagEliminate) => {
  //recibe los divs con el icono de eliminar
  tagEliminate.addEventListener("click", () => {
    //Evento click para cada icono
    let filtrador = categoryStorage.filter(
      (category) => category != tagEliminate.id
    );
    //Nombro una variable que sera un .filter() de el localStorage con la key que contiene las categorias
    //El fiter traera un array con todas las categorias menos la seleccionada para eliminar
    //Utilizando como referencia el id del div eliminar que es igual a su categoria padre
    localStorage.removeItem("categorys");
    //Remuevo la key anterior con los datos viejos
    localStorage.setItem("categorys", JSON.stringify(filtrador));
    //Y le hago setItem con la nueva array con la categoria eliminada
    window.location.reload();
  });
};

//4.Filtrar las tareas que tengan la categorias seleccionadas (categoryFilters())
export let categoryFilters = (data, tagCategory, divTask) => {
  //recibe la data del servidor, el id de cada div de las categorias creadas,
  //recibe el array de cada div de las tareas
  data.forEach((category) => {
    //Recorre la data del servidor
    divTask.forEach((divTask) => {
      //recorre el array de los divs de cada tarea en pantalla
      if (category.category != tagCategory && category.task == divTask.id) {
        //Si la categoria en de la tarea en el servidor es diferente a la categoria seleccionada
        //y el texto de esa tarea es igual al id de su div (para agarrar el div de esa tarea en especifico)
        divTask.style.display = "none";
        let filtered = new dataFilter("yes");
        putRequest(category.id, filtered);
        //Si eso se cumple hara un nuevo dataFilter para cambiar el estado de las tareas que cumplieron esa validacion
        //A filtered = 'yes' luego manda la solicitud al servidor con el putRequest()
        localStorage.setItem("filterStatus", "yes");
        localStorage.setItem("categoryInAction", tagCategory);
        //Cambiara la llave filterStatus a yes para mostrar que hay un filtro activo
        //Y pondra la categoria activa en el categoryInAction
        window.location.reload();
      }
    });
  });
};

//5.Cada tarea mantenga su categoria seleccionada (maintain_Selected_Tag())
export let maintain_Selected_Tag = (data, created_Tags_Categorys) => {
  //Recibe la data del servidor, y las etiquetas select creadas para cada tarea en un array
  created_Tags_Categorys.forEach((e) => {
    //Recorre las etiquetas select
    data.forEach((x) => {
      //Recorre la data del servidor
      if (e.value == x.category && e.id == x.id) {
        //Si el valor de la etiqueta select y el valor de la categoria de esa tarea en el servidor son iguales
        //Junto con sus ids, hara que el option de esa categoria este por defecto con selected = true
        e.selected = true;
      } else {
        console.log(false);
      }
    });
  });
};

//6.Al cambiar la categoria de alguna tarea esto se refleje en el servidor (category_Tag_Change())
export let category_Tag_Change = (selector) => {
  //Recibe el array que contiene las etiquetas select de cada tarea en pantalla
  selector.addEventListener("change", () => {
    //Evento change cuando el valor del select cambie a otro
    let categoryChange = new dataCategory(selector.value);
    putRequest(selector.id, categoryChange);
    //hara un put request con el nuevo valor del select (la categoria nueva seleccionada) y un putRequest con el
    //id del selector que es igual al de su tarea padre
    window.location.reload();
  });
};

//7.Mostrar cada una de las categorias en el select de cada tarea (tagSelectors())
export let tagSelectors = (select, data, divsTask) => {
  //recibe las etiquets select creadas, la data del servidor, y el array de los dis de cada tarea
  let created_Tags_Categorys = [];
  select.forEach((selector) => {
    //recorre las etiquetas select de cada tarea
    let defecto = document.createElement("option");
    defecto.value = "none";
    defecto.innerHTML = "none";
    selector.appendChild(defecto);
    //recorro primero cada select para crear un option que sera por defecto para cada tarea
    categoryStorage.forEach((cate) => {
      //Luego recorro el storage de las categorias creadas
      let categorias = document.createElement("option");
      defecto.value = "none";
      defecto.innerHTML = "none";
      categorias.id = selector.id;
      categorias.value = cate;
      categorias.innerHTML = cate;
      categorias.id == selector.id;
      created_Tags_Categorys.push(categorias);
      selector.appendChild(categorias);
      //Creo opciones para cada etiqueta select por cada categoria en local storage
      //Asi cada tarea podra seleccionar las categori disponibles
    });
    category_Tag_Change(selector);
  });
  maintain_Selected_Tag(data, created_Tags_Categorys);
  /////////////////
  showCategorys(divsTask, data);
};
