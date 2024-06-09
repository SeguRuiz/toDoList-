//link del servidor
const linkData = "http://localhost:3000/api/task/"
//forms e input para agregar tareas
let formTask = document.getElementById("taskForm");
let inputTask = document.getElementById("formInput");

//Div donde se mostraran las tareas
let showTasksDiv = document.getElementById("inProgres")

//Mostrador del conteo de checks
let countShow = document.getElementById("countdown");

//Dialog(modal), form e input para editar tareas
let modal = document.getElementById('editTask')
let formEdit = document.querySelector('.editForm')
let editInput = document.getElementById('edited')

//Dialog(modal), form e input para editar tareas
let searchbtn = document.querySelector('.searchActive')
let searchModal = document.getElementById('editSearch')
let searchInput = document.getElementById('Search')
let searchForm = document.getElementById('searchForm')

//Dialog(modal), form e input para agregar categorias 
let categoryModal = document.getElementById('addCategory')
let categoryInput = document.getElementById('categoryInpt')
let categoryForm = document.getElementById('categoryForm')
let openCategory = document.getElementById('openCategorys')

//div que contendra las categorias creadas
let tagsContainer = document.getElementById('categoryTags')

//El storage que tiene las categorias guardadas en el localStorage 
let categoryStorage = JSON.parse(localStorage.getItem('categorys')) || []

///////
let tareas = []
let selectors = []
let divsTasks = []
let checkboxes = []
let estadoFilter = true;

let contador = 0
let contador2 = 0

export { formTask, inputTask, contador, checkboxes, countShow, showTasksDiv, contador2, modal, formEdit
, editInput, searchModal, searchbtn, tareas, searchInput, searchForm,estadoFilter, categoryModal, categoryInput
, categoryForm, categoryStorage, openCategory, selectors, tagsContainer, divsTasks, linkData};
