import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// 3 stulpeliai
const columns = [
  { status: "todo", title: "Reikia padaryti" },
  { status: "in-progress", title: "Vykdoma" },
  { status: "done", title: "Atlikta" },
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  // useEffect nueina ir atnesa uzduotis
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.log("Klaida:", error));
  }, []);

  // +nauja uzduotis
  const addTask = () => {
    if (newTitle.trim() === "") return; // turi buti tekstas

    axios
      .post("http://localhost:5000/api/tasks", {
        title: newTitle,
        status: "todo",
      })
      .then((response) => {
        setTasks([...tasks, response.data]);
        setNewTitle("");
      })
      .catch((error) => console.log("Klaida:", error));
  };

  // -uzduotis
  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:5000/api/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== id));
      })
      .catch((error) => console.log("Klaida:", error));
  };

  // atnaujina busena is todo i vykdoma ar atlikta
  const updateStatus = (id, newStatus) => {
    axios
      .put(`http://localhost:5000/api/tasks/${id}`, { status: newStatus })
      .then((response) => {
        setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      })
      .catch((error) => console.log("Klaida:", error));
  };

  return (
    <div className="app">
      <h1>Kanban lenta</h1>
      <p className="subtitle">Vilnius Coding School Danielius Buzanas</p>
      <div className="add-task">
        <input
          type="text"
          placeholder="Nauja užduotis..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>Pridėti</button>
      </div>

      <div className="board">
        {columns.map((column) => (
          <div
            className="column"
            key={column.status}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const taskId = e.dataTransfer.getData("taskId");
              updateStatus(taskId, column.status);
            }}
          >
            <h2>{column.title}</h2>

            {tasks
              .filter((task) => task.status === column.status)
              .map((task) => (
                <div
                  className="card"
                  key={task._id}
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData("taskId", task._id)
                  }
                >
                  <span>{task.title}</span>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task._id)}
                  >
                    ×
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
