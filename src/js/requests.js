import { linkData } from "./variables_Global";
import { showContent } from "./principalFunction";

/*
Request hara un fetch a al api para recojer la data 
lo cual esta data pasara a la funcion showContent que muestra
cada una de las tareas en el api con sus respectivas 
funciones

la funcion showContent es la principal en mostrar tareas, se encuentra en,
principalFunction.js
*/
export let request = async () => {
  try {
    let response = await fetch(linkData);
    let data = await response.json();
    showContent(data);
  } catch (error) {
    console.log(error);
  }
};
request();
/* 
requestPost la llamo en cada situacion que mecesite agregar algo al api
*/
export let requestPost = async (dataObject) => {
  /* 
recibira un objeto que sera la clase encargada en dar un objeto para el post 
y tendra como constante linkData que es el link del servidor.

linkData se encuentra en varaibales_Global.js
La clase del post se encuentra en class_data.js
*/
  try {
    let response = await fetch(linkData, dataObject);
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
/*
putRequest la utilizo cuando necesito realizar un post o un delete
ya que sirve para los dos casos
*/
export let putRequest = async (thisId, deleteThis) => {
/*
Recibira el id de la tarea que quiera hacer un delete o un put
luego el objeto hecho con la clase respectiva para el caso

Las clases utilizadas para esta funcion serian las siquientes:
class dataDelete, class DataCheck
class dataChange, class dataFilter
class dataCategory.

Se encuentran en class_data.js
*/
  try {
   fetch(linkData + thisId, deleteThis);
  } catch (error) {
    console.log(error);
  }
};


