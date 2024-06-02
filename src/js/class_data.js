class dataPost {
  method = "";
  headers = {
    "Content-Type": "application/json",
  };
  body = "";
  status = "show"
  constructor(method, task) {
    this.method = method;
    this.body = JSON.stringify({
      task,
    });
    
  }

}
class DataPut  {
  method = "";
  headers = {
    "Content-Type": "application/json",
  };
  body = "";
  constructor(method, status) {
    this.method = method;
    this.body = JSON.stringify({
      status,
    });
    
  }
}
export { dataPost, DataPut };
