const express = require("express");
const bodyParser = require("body-parser");
const memoryDB = (() => {
  let myObject = {};
  let db = [];
  let id = 0;

  myObject.get = (id) => {
    if (id) {
      id = typeof id === "string" ? Number(id) : id;
      return db.filter((todo) => todo.id === id);
    } else {
      return db;
    }
  };

  myObject.insert = (todo) => {
    todo.id = ++id;
    db = db.concat(todo);
    return todo;
  };

  myObject.remove = (id) => {
    let result = false;

    if (id) {
      id = typeof id === "string" ? Number(id) : id;
      db = db.filter((todo) => todo.id !== id);
      result = true;
    } else {
      db = [];
      result = true;
    }

    return result;
  };

  return myObject;
})();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.get("/todo", (req, res) => {
  res.send(memoryDB.get());
});
app.post("/todo", (req, res) => {
  let dateTodo = req.body.dateTodo;
  let doTodo = req.body.doTodo;
  let isTodo = req.body.isTodo;

  if (dateTodo && doTodo && isTodo) {
    memoryDB.insert({
      dateTodo: dateTodo,
      doTodo: doTodo,
      isTodo: isTodo,
    });

    res.redirect("http://localhost:8888/todo");
  } else {
    throw new Error("Insert Error!");
  }
});
app.get("/todo/:id", (req, res) => {
  res.send(memoryDB.get(req.params.id));
});
app.put("/todo/:id", (req, res) => {
  let id = req.params.id;

  let dateTodo = req.body.dateTodo;
  let doTodo = req.body.doTodo;
  let isTodo = req.body.isTodo;

  let todo = memoryDB.get(id)[0];

  todo.dateTodo = dateTodo || todo.dateTodo;
  todo.doTodo = doTodo || todo.doTodo;
  todo.isTodo = isTodo || todo.isTodo;

  res.redirect("http://localhost:8888/todo");
});
app.delete("/todo/:id", (req, res) => {
  memoryDB.remove(req.params.id);
  res.redirect("http://localhost:8888/todo");
});

app.delete("/todo/", (req, res) => {
  memoryDB.remove();
  res.redirect("http://localhost:8888/todo");
});

app.listen(8888, () => {
  console.log(8888);
});
