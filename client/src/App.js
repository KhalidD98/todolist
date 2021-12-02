import "./App.css";
import { useState } from "react";
import axios from "axios"

function App() {
  const [task, setTask] = useState("")
  const [completed, setCompleted] = useState(0)

  const addTask = () => {
    axios.post("http://localhost:3001/create", {
      task: task,
      completed: completed
    })
  }

  const updateStatus = () => {

  }

  return (
    <div className="App">
      <div className="info">
        <label>Task:</label>
        <input
          type="text"
          onChange={(event) => {
            setTask(event.target.value);
          }}
        />
        <label>Completed:</label>
        <input type="checkbox" id="myCheck" onclick="updateStatus()"></input>
        <button onClick={addTask}>Add Task</button>
      </div>
    </div>
  );
}

export default App;
