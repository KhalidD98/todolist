import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios"
import { makeStyles } from '@mui/styles';
import AddTaskModal from './AddTask'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import FilterMenu from './Components/FilterMenu'
import TextField from '@mui/material/TextField';
import TaskList from "./Components/TaskList";

const useStyles = makeStyles({
  addTaskModal: {
    position: 'fixed',
    bottom: '100px',
    right: '100px',
  },
  taskContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    // marginLeft: '10rem',
    width: '60vw',
    fontSize: '3.4rem',
    fontFamily: 'Roboto, sans-serif',
  }
});

function App() {
  const classes = useStyles();
  const [taskList, setTaskList] = useState([])
  const [filtered, setFiltered] = useState(false)
  const [filteredList, setFilteredList] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    getTasks()
  }, []);

  //----- Add new task -----//
  const addTask = (task) => {
    axios.post("http://localhost:3001/create", {
      task: task,
      completed: 0
    }).then((res) => { // Update local array with new task
      setTaskList([...taskList, { id: res.data.insertId, task: task, completed: 0 }])
    })
  }

  //----- Get all tasks -----//
  const getTasks = () => {
    axios.get("http://localhost:3001/todos").then((response) => {
      setTaskList(response.data)
    })
  }

  //----- Delete task from db -----//
  const deleteTask = (id) => {
    axios.post(`http://localhost:3001/delete`, { id: id })
    setTaskList(taskList.filter(k => k.id !== id))
  }

  //----- Set to complete -----//
  const updateCompleteStatus = (id, completed) => {
    // Update completed status
    const newState = taskList.map(obj =>
      obj.id === id ? { ...obj, completed: !completed } : obj
    );
    setTaskList(newState)
    axios.post(`http://localhost:3001/update`, { id: id, completed: !completed })
  }

  //----- editTask -----//
  const editTask = (id, task) => {
    // Update task text
    const newState = taskList.map(obj =>
      obj.id === id ? { ...obj, task: task } : obj
    );
    setTaskList(newState)
    axios.post(`http://localhost:3001/edit`, { task: task, id: id })
  }

  //----- Filter the list -----//
  const filterList = (filterOption) => {
    console.log(taskList)
    console.log(filteredList)
    switch (filterOption) {
      case 'completed':
        setFiltered(true)
        setFilteredList(taskList.filter(obj => obj.completed === 1 || obj.completed === true))
        break
      case 'pending':
        setFiltered(true)
        setFilteredList(taskList.filter(obj => obj.completed === 0 || obj.completed === false))
        break
      case 'all':
        setFiltered(false)
        setFilteredList([])
        break
    }
  }

  return (
    <div>

      <h2 className={classes.title}>
        KD's ToDo list
      </h2>

      <TextField onChange={(e) => setSearchTerm(e.target.value)} label="Search for task..." variant="standard" />

      {/*----- List of Todos -----*/}
      <div className={classes.taskContainer}>
        <FilterMenu filterList={filterList} />
        <TaskList
          editTask={editTask}
          deleteTask={deleteTask}
          updateCompleteStatus={updateCompleteStatus}
          list={filtered ? filteredList : taskList}
          searchTerm={searchTerm}
        />

      </div>

      {/* Add Task Button */}
      <div className={classes.addTaskModal}>
        <AddTaskModal addTask={addTask} />
      </div>

    </div >
  );
}

export default App;
