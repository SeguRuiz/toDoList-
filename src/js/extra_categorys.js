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

//Agregar categorias
export let addCategorys = () => {
  openCategory.addEventListener("click", () => {
    categoryModal.showModal();
  });

  categoryForm.addEventListener("submit", (x) => {
    x.preventDefault();
    let value = categoryInput.value;
    let valueFiltered = value.trim();
    if (valueFiltered != "") {
      categoryStorage.push(valueFiltered);
      localStorage.setItem("categorys", JSON.stringify(categoryStorage));

      window.location.reload();
    }
  });
};
//show categorys

export let showCategorys = (divsTask, data) => {
  categoryStorage.forEach((tag) => {
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
    tagDivText.appendChild(tagText);
    tagDiv.appendChild(tagDivText);
    tagDiv.appendChild(tagEliminate);
    tagsContainer.appendChild(tagDiv);
    ///////////////////////////////////

    eliminateCategory(tagEliminate);
    /////////////////////
    tagDivText.addEventListener("click", () => {
      categoryFilters(data, tagDivText.id, divsTask);
    });
  });
};

export let eliminateCategory = (tagEliminate) => {
  tagEliminate.addEventListener("click", () => {
    let filtrador = categoryStorage.filter(
      (category) => category != tagEliminate.id
    );
    localStorage.removeItem("categorys");
    localStorage.setItem("categorys", JSON.stringify(filtrador));
    window.location.reload();
  });
};

export let categoryFilters = (data, tagCategory, divTask) => {
  let contador = 0;
  data.forEach((category) => {
    divTask.forEach((divTask) => {
      if (category.category != tagCategory && category.task == divTask.id) {
        console.log(contador);
        divTask.style.display = "none";
        let filtered = new dataFilter("yes");
        putRequest(category.id, filtered);
        localStorage.setItem("filterStatus", "yes");
        localStorage.setItem("categoryInAction", tagCategory);
        window.location.reload();
      }
    });
  });
};

/////////////
export let maintain_Selected_Tag = (data, created_Tags_Categorys)=>{created_Tags_Categorys.forEach((e) => {
    data.forEach((x) => {
      if (e.value == x.category && e.id == x.id) {
        e.selected = true;
      } else {
        console.log(false);
      }
    });
  });
 }

/////////////////
export let category_Tag_Change = (selector) =>{selector.addEventListener("change", () => {
    let categoryChange = new dataCategory(selector.value);
    putRequest(selector.id, categoryChange);
    window.location.reload();
  });
  }

/////////////////////////////
export let tagSelectors = (select, data, divsTask) => {
    let created_Tags_Categorys = [];
    select.forEach((selector) => {
      let defecto = document.createElement("option");
      defecto.value = "none";
      defecto.innerHTML = "none";
      selector.appendChild(defecto);
      categoryStorage.forEach((cate) => {
        let categorias = document.createElement("option");
        defecto.value = "none";
        defecto.innerHTML = "none";
        categorias.id = selector.id;
        categorias.value = cate;
        categorias.innerHTML = cate;
        categorias.id == selector.id;
        created_Tags_Categorys.push(categorias);
        selector.appendChild(categorias);
      });
      category_Tag_Change(selector);
    });
    maintain_Selected_Tag(data, created_Tags_Categorys);
    /////////////////
    showCategorys(divsTask, data);
  };