//Imports
import { dataPost_Put } from "../js/class_data";
import { formTask, inputTask, test , body} from "../js/variables";


//fetch request
let linkData = "http://localhost:3000/api/task";
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
    console.log(data);
    data.forEach(object => {
      let text = document.createElement('p')
      text.innerHTML = object.task
      document.getElementById('inProgres').appendChild(text)
    });
  } catch (error) {
    console.log(error);
  }
};
test.addEventListener("click", () => {
  requestPost();
});
//hace post a la base de datos con el valor del input, {task: inputTask.value}
formTask.addEventListener('submit', (m)=>{
m.preventDefault()
let Task = new dataPost_Put('post', inputTask.value)
requestPost(Task)
})
//Cargar contenido 
request()