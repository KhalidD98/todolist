require('dotenv').config()
const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require("cors")

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const db_data = {
  connectionLimit: 2,
  user: process.env.db_user,
  host: process.env.db_host,
  password: process.env.db_password,
  database: process.env.db_database,
}

// mysql.createConnection()

var db = mysql.createPool(db_data);

db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
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

//----- Edit task -----//
app.post('/edit', (req, res) => {
  const newTask = req.body.task
  const taskID = req.body.id
  db.query(`UPDATE todos SET task='${newTask}' WHERE id=${taskID}`, (err, result) => {
    (err) ? console.log(err) : res.send(result)
  })
})


app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running")
})