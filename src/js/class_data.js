/*
Aqui estan las clases para cada medoto POST/DELETE/PUT, y variaciones de esta 
que cambie para casa necesidad de las funciones de la pagina.

Use clases en vez objetos porque me facilita el control de cada cambio que envio al 
API.
*/

//Class para postear tareas
export class dataPost {
  method = "";

  headers = {
    "Content-Type": "application/json",
  };
  body = "";
  constructor(method, task) {
    //Post acepta metodo y la tarea que desee agregar.
    //Especifico metodo al llamar al cosntructor por cuestion de control.
    this.method = method;
    this.body = JSON.stringify({
      task,
      /*
      Cada tarea tendra por defecto estos valores para facilitarme el control
      de los estados check/filtered/category, para simplemente cambiarlo a como
      guste.
      */
      status: "unChecked",
      filtered: "no",
      category: "none",
    });
  }
}
//Class para eliminar tareas
export class dataDelete {
  method = "";
  constructor(method) {
    this.method = method;
    /*
    llamando al contructor solo necesito especificar el metodo delete
    para luego eliminar una tarea con el id que especifique
    en otro parametro del fetch
    */
  }
}
/*Class dataCheck, la utilizo para especificar que una tarea tiene el check activo 
y asi esta se mantenga en ese estado hasta que pase lo contrario */
export class DataCheck {
  method = "";
  headers = {
    "Content-Type": "application/json",
  };
  body = "";
  constructor(method, status) {
    /*al llamar el constructor especifico el metodo en put
    y recibe el nuevo status de la tarea que puede ser checked o unChecked*/
    this.method = method;
    this.body = JSON.stringify({
      status,
    });
  }
}

/*Class dataChange, la utilizo cuando quiero cambiar valor de una tarea existente,
como en el caso de la funcion para editar tareas*/
export class dataChange {
  method = "put";
  headers = {
    "Content-Type": "application/json",
  };
  body = "";
  constructor(task) {
    /*El consructor solo recibira el valor de la nueva tarea
    para ser editada*/
    this.body = JSON.stringify({
      task,
    });
  }
}
/*Class dataFilter, la utilizo para cambiar el estado de una tarea filtrada a 
yes/no me es muy util para el buscador y las categorias, la utilizo con el metodo PUT*/
export class dataFilter {
  method = "put";
  headers = {
    "Content-Type": "application/json",
  };
  body = "";
  constructor(filtered) {
    /*El constructor recibira un cambio de estado filtrado 
    yes/no*/
    this.body = JSON.stringify({
      filtered,
    });
  }
}
/*Class dataCategory, la utilizo para especificar a que categoria 
pertenece una tarea y luego cambiarla a como quiera*/
export class dataCategory {
  method = "put";
  headers = {
    "Content-Type": "application/json",
  };
  body = "";
  constructor(category) {
    /*La utilizo con el metodo put para cambiar la categoria 
    al nuevo valor que reciba el constructor*/
    this.body = JSON.stringify({
      category,
    });
  }
}

