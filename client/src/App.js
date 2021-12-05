import "./App.css";
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import axios from "axios"
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import AddTaskModal from './AddTask'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import EditIcon from '@mui/icons-material/Edit';
import EditTask from './EditTask'

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
  tasks: {
    backgroundColor: '#5c6bc0',
    color: 'white',
    width: '60vw',
    height: '4.5rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: '100px',
    paddingLeft: '2rem',
    marginTop: '1.4rem',
  },
  taskText: {
    paddingRight: '1rem',
    paddingLeft: '2rem',
  },
  editIcon: {
    paddingRight: '1rem',
    paddingLeft: '1rem',
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

  useEffect(() => {
    getTasks()
  }, []);

  //----- Add new task -----//
  const addTask = (task) => {
    axios.post("http://localhost:3001/create", {
      task: task,
      completed: false
    }).then((res) => { // Update local array with new task
      setTaskList([...taskList, { id: res.data.insertId, task: task, completed: false }])
    })
  }

  //----- Get all tasks -----//
  // TODO: Move to a useEffect for initial startup
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

  return (
    <div>

      <h2 className={classes.title}>
        KD's ToDo list
      </h2>

      {/*----- List of Todos -----*/}
      <div className={classes.taskContainer}>
        {taskList.slice(0).reverse().map((val, key) => { // Show tasks in reverse order (newest ones first)
          return <div className={classes.tasks}>
            {val.completed
              ? <CheckBoxIcon onClick={() => updateCompleteStatus(val.id, val.completed)} />
              : <CheckBoxOutlineBlankIcon onClick={() => updateCompleteStatus(val.id, val.completed)} />
            }
            <Typography className={classes.taskText}>{val.task}</Typography>
            {/* <EditIcon onClick={() => editTask(val.id, val.task)} className={classes.editIcon} /> */}
            <div className={classes.editIcon}>
              <EditTask editTask={editTask} id={val.id} />
            </div>
            <DeleteIcon onClick={() => deleteTask(val.id)} />
          </div>
        })}
      </div>

      {/* Add Task Button */}
      <div className={classes.addTaskModal}>
        <AddTaskModal addTask={addTask} />
      </div>

    </div >
  );
}

export default App;
