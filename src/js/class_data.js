class dataPost_Put {
  method = "";
  headers = {
    "Content-Type": "application/json",
  };
  body = "";

  constructor(method, task) {
    this.method = method;
    this.body = JSON.stringify({
      task,
    });
  }
}

export { dataPost_Put };
