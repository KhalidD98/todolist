const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "user",
    host: "localhost",
    password: "root",
    database: "employeeSystem",
  });