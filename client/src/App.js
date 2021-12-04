import "./App.css";
import { useState } from "react";
import Button from '@mui/material/Button';
import axios from "axios"
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({

});

function App() {
  const classes = useStyles();
  const [task, setTask] = useState("")
  const [completed, setCompleted] = useState(false)

  const [taskList, setTaskList] = useState([])
  //----- Add new task -----//
  const addTask = () => {
    axios.post("http://localhost:3001/create", {
      task: task,
      completed: completed
    }).then((res) => { // Update local array with new task
      setTaskList([...taskList, { id: res.data.insertId, task: task, completed: completed }])
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

  return (
    <div className="App">

      <div className="info">
        <label>New Task:</label>
        <TextField
          onChange={(event) => { setTask(event.target.value); }}
          label="New Task"
          variant="outlined"
        />
        <Checkbox onClick={() => { setCompleted(completed => !completed) }} />
        <Button onClick={addTask} variant="contained">Add Task</Button>
        <Button onClick={getTasks} variant="contained">Show all tasks</Button>
      </div>

      {/*----- List of Todos -----*/}
      {taskList.slice(0).reverse().map((val, key) => { // Show tasks in reverse order (newest ones first)
        return <div>
          <Checkbox checked={val.completed} />
          <Typography>{val.task}</Typography>
          <DeleteIcon onClick={() => deleteTask(val.id)} />
        </div>
      })}

    </div>
  );
}

export default App;
