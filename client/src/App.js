import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios"
import { makeStyles } from '@mui/styles';
import AddTaskModal from './AddTask'
import FilterMenu from './Components/FilterMenu'
import TextField from '@mui/material/TextField';
import TaskList from "./Components/TaskList";
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles({
  addTaskModal: {
    position: 'fixed',
    bottom: '100px',
    right: '100px',
  },
  taskContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto',
    width: 'auto',
    height: '100vh',
    overflow: 'hidden',
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '75vh',
    width: '100%',
    overflow: 'auto',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none'
    },
  },
  searchField: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2rem',
    marginTop: '1rem',
  },
  filterMenu: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  circle: {
    height: '14rem',
    width: '14rem',
    zIndex: '-1000',
    left: '-3rem',
    backgroundImage: 'linear-gradient(to bottom right, #c471ed, #f64f59)',
    borderRadius: '50%',
    position: 'absolute',
  },
  circle2: {
    height: '6rem',
    width: '6rem',
    zIndex: '-1000',
    left: '68%',
    top: '15%',
    backgroundImage: 'linear-gradient(to bottom right, #f64f59, #c471ed)',
    borderRadius: '50%',
    position: 'absolute',
  },
  circle3: {
    height: '6rem',
    width: '6rem',
    zIndex: '-1000',
    left: '18%',
    top: '80%',
    backgroundImage: 'linear-gradient(to bottom right, #f64f59, #c471ed)',
    borderRadius: '50%',
    position: 'absolute',
  },
  circle4: {
    height: '6rem',
    width: '6rem',
    zIndex: '-1000',
    left: '88%',
    top: '60%',
    backgroundImage: 'linear-gradient(to bottom right, #f64f59, #c471ed)',
    borderRadius: '50%',
    position: 'absolute',
  },
  smallCircle: {
    height: '2rem',
    width: '2rem',
    zIndex: '-1000',
    left: '40%',
    top: '64%',
    backgroundImage: 'linear-gradient(to bottom right, #c451ed, #f64e39, #f04e39)',
    borderRadius: '50%',
    position: 'absolute',
  },
  smallCircle2: {
    height: '2rem',
    width: '2rem',
    zIndex: '-1000',
    left: '60%',
    top: '41%',
    backgroundImage: 'linear-gradient(to top right, #c171ed, #f62f59)',
    borderRadius: '50%',
    position: 'absolute',
  },
  textField: {
    color: 'white',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    marginTop: '5rem',
  }
});

const InputTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#9c9c9c',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#D8D8D8',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#D8D8D8',
    },
    '&:hover fieldset': {
      borderColor: '#D8D8D8',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#D8D8D8',
    },
  },
});

function App() {
  const classes = useStyles();
  const [taskList, setTaskList] = useState([])
  const [filtered, setFiltered] = useState(false)
  const [filteredList, setFilteredList] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTasks()
  }, []);

  //----- Add new task -----//
  const addTask = (task) => {
    axios.post("https://kd-todo-list.herokuapp.com/create", {
      task: task,
      completed: 0
    }).then((res) => { // Update local array with new task
      setTaskList([...taskList, { id: res.data.insertId, task: task, completed: 0 }])
    })
  }

  //----- Get all tasks -----//
  const getTasks = () => {
    setLoading(true)
    axios.get("https://kd-todo-list.herokuapp.com/todos").then((response) => {
      setTaskList(response.data)
      setLoading(false)
    })
  }

  //----- Delete task from db -----//
  const deleteTask = (id) => {
    axios.post(`https://kd-todo-list.herokuapp.com/delete`, { id: id })
    setTaskList(taskList.filter(k => k.id !== id))
  }

  //----- Set to complete -----//
  const updateCompleteStatus = (id, completed) => {
    // Update completed status
    const newState = taskList.map(obj =>
      obj.id === id ? { ...obj, completed: !completed } : obj
    );
    setTaskList(newState)
    axios.post(`https://kd-todo-list.herokuapp.com/update`, { id: id, completed: !completed })
  }

  //----- editTask -----//
  const editTask = (id, task) => {
    // Update task text
    const newState = taskList.map(obj =>
      obj.id === id ? { ...obj, task: task } : obj
    );
    setTaskList(newState)
    axios.post(`https://kd-todo-list.herokuapp.com/edit`, { task: task, id: id })
  }

  //----- Filter the list -----//
  const filterList = (filterOption) => {
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
      default:
        console.error("Invalid Drop Down Option")
    }
  }

  return (
    <div>

      <div className={classes.circle}></div>
      <div className={classes.circle2}></div>
      <div className={classes.circle3}></div>
      <div className={classes.circle4}></div>
      <div className={classes.smallCircle}></div>
      <div className={classes.smallCircle2}></div>

      <div className={classes.searchField}>
        <InputTextField
          label="Search for Task"
          inputProps={{ maxLength: 30 }}
          disabled={loading}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputLabelProps={{
            style: { color: '#D8D8D8' },
          }}
          InputProps={{ className: classes.textField }}
        />
      </div>

      <div className={classes.filterMenu}>
        <FilterMenu filterList={filterList} loading={loading} />
      </div>

      {/*----- List of Todos -----*/}
      {loading
        ? <div className={classes.loading}> <CircularProgress color="secondary" /> </div>
        : <div className={classes.taskContainer}>
          <div className={classes.taskList}>
            <TaskList
              editTask={editTask}
              deleteTask={deleteTask}
              updateCompleteStatus={updateCompleteStatus}
              list={filtered ? filteredList : taskList}
              searchTerm={searchTerm}
            />
          </div>
        </div>
      }

      {/* Add Task Button */}
      {!loading &&
        <div className={classes.addTaskModal}>
          <AddTaskModal addTask={addTask} />
        </div>
      }

    </div >
  );
}

export default App;
