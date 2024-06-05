//forms
let formTask = document.getElementById("taskForm");
let inputTask = document.getElementById("formInput");
let test = document.getElementById("test");
let showTasksDiv = document.getElementById("inProgres")
///
let body = document.getElementById("body");
//contador
let contador = 0
let contador2 = 0
let countShow = document.getElementById("countdown");
//checkboxes
let checkboxes = []
//Modal edit 
let modal = document.getElementById('editTask')
let formEdit = document.querySelector('.editForm')
let editInput = document.getElementById('edited')
//modal search
let searchbtn = document.querySelector('.searchActive')
let searchModal = document.getElementById('editSearch')
let searchInput = document.getElementById('Search')
let searchForm = document.getElementById('searchForm')
///////
let tareas = []

export { formTask, inputTask, test, body , contador, checkboxes, countShow, showTasksDiv, contador2, modal, formEdit
, editInput, searchModal, searchbtn, tareas, searchInput, searchForm };
