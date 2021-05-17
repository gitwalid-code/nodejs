// npm i express nodemon uuid
// Pakages :
// pour lire les données en JSON
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 5000;
//Middleware :

app.use(morgan(""));

// pour lire les données en JSON

app.use(express.json());

// Pour lire les donnÃ©es en JSON
app.use(express.json());

let todos = [
  {
    id: 5,
    task: "todo 1",
    checked: false,
  },
  {
    id: 12,
    task: "todo 2",
    checked: true,
  },
];
// todo = {
//     id : ,
//     task : ,
//     checked :
// }
app.get("/", (req, res) => {
  res.send("todo");
});

app.get("/todos", (req, res) => {
  res.status(200).send(todos);
});

app.post("/todos", (req, res) => {
  // const task = req.body.task
  const { task } = req.body;
  const todo = {
    id: uuidv4(),
    task, //task: task
    checked: false,
  };
  todos.push(todo);
  res.status(201).send(todo);
});

app.put("/todos/:id", (req, res) => {
  try {
    const { task } = req.body;
    const { id } = req.params;
    const todo = todos.find((elem) => elem.id == id);
    if (todo == undefined) {
      return res.status(400).send({
        message: "todo not existe",
      });
    }
    todo.task = task;
    res.status(200).send(todo);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error interne",
    });
  }
});

app.patch("/todos/:id", (req, res) => {
  try {
    const { id } = req.params;
    const todo = todos.find((elem) => elem.id == id);
    if (todo == undefined) {
      return res.status(400).send({
        message: "todo not existe",
      });
    }
    todo.checked = !todo.checked;
    res.status(200).send(todo);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error interne",
    });
  }
});

app.delete("/todos/:id", (req, res) => {
  try {
    const { id } = req.params;
    // const index = todos.findIndex((elem) => elem.id == id);
    // if (index == -1) {
    //   return res.status(400).send({
    //     message: "todo doesn't exist",
    //   });
    // }
    // todos.splice(index, 1);
    const todo = todos.find((elem) => elem.id == id);
    if (todo == undefined) {
      return res.status(400).send({
        message: "todo doesn't exist",
      });
    }
    todos = todos.filter((elem) => elem.id != id);
    res.status(200).send(todos);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error interne",
    });
  }
});

app.listen(PORT, () => console.log("Listening on http://localhost:" + PORT));
