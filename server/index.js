const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "todolist",
});

//----- Create new task -----//
app.post("/create", (req, res) => {
  const task = req.body.task
  const completed = req.body.completed

  db.query("INSERT INTO todos (task, completed) VALUES(?, ?)",
    [task, completed],
    (err, result) => {
      (err) ? console.log(err) : res.send("Values Inserted")
    }
  )
})

//----- Get all tasks -----//
app.get('/todos', (req, res) => {
  db.query("SELECT * FROM todos", (err, result) => {
    (err) ? console.log(err) : res.send(result)
  })
})


app.listen(3001, () => {
  console.log("Server is running on port 3001");
});