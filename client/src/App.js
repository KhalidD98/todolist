import "./App.css";
import { useState } from "react";
import Button from '@mui/material/Button';
import axios from "axios"
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';

function App() {
  const [task, setTask] = useState("")
  const [completed, setCompleted] = useState(0)

  const [taskList, setTaskList] = useState([])

  const addTask = () => {
    axios.post("http://localhost:3001/create", {
      task: task,
      completed: completed
    }).then(() => { // Update local array with new task
      setTaskList([...taskList, { task: task, completed: completed }])
    })
  }

  const getTasks = () => {
    axios.get("http://localhost:3001/todos").then((response) => {
      setTaskList(response.data)
    })
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
      {taskList.slice(0).reverse().map((val, key) => { // Show tasks in reverse order (newest ones first)
        return <div>
          <h3>{val.task}</h3>
          <input
            type="checkbox"
            checked={(val.completed)}
          ></input>
        </div>
      })}
    </div>
  );
}

export default App;
