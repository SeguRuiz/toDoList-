import { linkData } from "./variables_Global";
import { showContent } from "./index";
let requestPost = async (dataObject) => {

  try {
    let response = await fetch(linkData, dataObject);
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
let request = async () => {
  try {
    let response = await fetch(linkData);
    let data = await response.json();
    console.log(response.ok);
    showContent(data);
    return response.ok;
  } catch (error) {
    console.log(error);
  }
};
//Cargar contenido
let putRequest = async (thisId, deleteThis) => {
  try {
    let response = await fetch(linkData + thisId, deleteThis);
    let data = await response.json();
  } catch (error) {
    console.log(error);
  }
};

export { request, putRequest, requestPost };
