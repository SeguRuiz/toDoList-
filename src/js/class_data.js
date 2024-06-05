class dataPost {
  method = "";
  headers = {
    "Content-Type": "application/json",
  };
  body = "";
  constructor(method, task) {
    this.method = method;
    this.body = JSON.stringify({
      task,
      status: "show",
    });
  }
}
class DataPut {
  method = "";
  headers = {
    "Content-Type": "application/json",
  };

  constructor(method) {
    this.method = method;
  }
}

class DataCheck {
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

class dataChange {
  method = "put";
  headers = {
    "Content-Type": "application/json",
  };
  body = "";
  constructor(task) {
    this.body = JSON.stringify({
      task,
    });
  }
}
export { dataPost, DataPut, DataCheck, dataChange };
