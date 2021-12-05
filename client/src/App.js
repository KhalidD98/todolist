import "./App.css";
import React, { useState } from "react";
import Button from '@mui/material/Button';
import axios from "axios"
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import AddTaskModal from './AddTask'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

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
    height: '5rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    margin: '1rem',
  },
  taskText: {
    paddingRight: '1rem',
    paddingLeft: '1rem',
  }
});

function App() {
  const classes = useStyles();
  const [taskList, setTaskList] = useState([])

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
      console.log(response.data)
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

  return (
    <div>

      <div>
        <Button onClick={getTasks} variant="contained">Show all tasks</Button>
      </div>

      {/*----- List of Todos -----*/}
      <div className={classes.taskContainer}>
        {taskList.slice(0).reverse().map((val, key) => { // Show tasks in reverse order (newest ones first)
          return <div className={classes.tasks}>
            {val.completed
              ? <CheckBoxIcon onClick={() => updateCompleteStatus(val.id, val.completed)} />
              : <CheckBoxOutlineBlankIcon onClick={() => updateCompleteStatus(val.id, val.completed)} />
            }
            <Typography className={classes.taskText}>{val.task}</Typography>
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
