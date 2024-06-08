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
      filtered: "no",
      category: "none",
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
class dataFilter {
  method = "put";
  headers = {
    "Content-Type": "application/json",
  };
  body = "";
  constructor(filtered) {
    this.body = JSON.stringify({
      filtered,
    });
  }
}
class dataCategory {
  method = "put";
  headers = {
    "Content-Type": "application/json",
  };
  body = "";
  constructor(category) {
    this.body = JSON.stringify({
      category,
    });
  }
}

export { dataPost, DataPut, DataCheck, dataChange, dataFilter, dataCategory };
