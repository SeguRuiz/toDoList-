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

export let openSearch = (objectData) => {
  searchbtn.addEventListener("click", () => {
    objectData.forEach((tasks) => {
      if (tasks.filtered == "yes") {
        let rewind = new dataFilter("no");
        putRequest(tasks.id, rewind);
        localStorage.setItem("filterStatus", "no");
        localStorage.setItem("categoryInAction", "none");
        window.location.reload();
      } else {
        searchModal.showModal();
      }
    });
  });
};

export let searchThis = (tasks, div, searchModal) => {
  searchForm.addEventListener("submit", (o) => {
    o.preventDefault();
    let valueInput = searchInput.value;
    let valueFiltered = valueInput.trim();
    if (valueFiltered == "") {
      searchModal.close();
    } else {
      tasks.forEach((element) => {
        if (
          element.innerHTML.includes(valueFiltered) == false &&
          div.id == element.innerHTML
        ) {
          estadoFilter = true;
          div.style.display = "none";
          let filtered = new dataFilter("yes");
          putRequest(element.id, filtered);
          localStorage.setItem("filterStatus", "yes");

          window.location.reload();
        }
      });
    }
  });
};

export let searchPreview = (data, div) => {
  searchInput.addEventListener("input", (o) => {
    let characters = o.target.value;
    data.forEach((element) => {
      if (
        element.innerHTML.includes(characters) == false &&
        div.id == element.innerHTML
      ) {
        div.style.display = "none";
      }

      if (characters == "" && div.id == element.innerHTML) {
        div.style.display = "flex";
      }
    });
  });
};


export let changeFilterIcon = () => {
  if (localStorage.getItem("filterStatus") == "yes") {
    searchbtn.innerHTML =
      '<i class="fa-solid fa-filter-circle-xmark fa-sm" style="color: #ffffff;"></i>';
  }
};



