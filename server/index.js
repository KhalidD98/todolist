require('dotenv').config()
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: process.env.db_user,
  host: process.env.db_host,
  password: process.env.db_password,
  database: process.env.db_database,
});

//----- Create new task -----//
app.post("/create", (req, res) => {
  const task = req.body.task
  const completed = req.body.completed

  db.query("INSERT INTO todos (task, completed) VALUES(?, ?)",
    [task, completed],
    (err, result) => {
      (err) ? console.log(err) : res.send(result)
    }
  )
})

//----- Get all tasks -----//
app.get('/todos', (req, res) => {
  db.query("SELECT * FROM todos", (err, result) => {
    (err) ? console.log(err) : res.send(result)
  })
})

//----- Delete task -----//
app.post('/delete', (req, res) => {
  const taskID = req.body.id
  db.query(`DELETE FROM todos WHERE id=${taskID}`, (err, result) => {
    (err) ? console.log(err) : res.send(result)
  })
})

//----- Update task -----//
app.post('/update', (req, res) => {
  const completedStatus = req.body.completed
  const taskID = req.body.id
  db.query(`UPDATE todos SET completed=${completedStatus} WHERE id=${taskID}`, (err, result) => {
    (err) ? console.log(err) : res.send(result)
  })
})


app.listen(3001, () => {
  console.log("Server is running on port 3001");
});