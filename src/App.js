import React, { useEffect, useState } from "react";
import "./App.css";
import TaskInput from "./components/TaskInput";
import TaskItems from "./components/TaskItems";
import axios from "axios";
import Swal from "sweetalert2";

function App() {
  const [toDoList, setToDoList] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const fetchedTasks = response.data
          .slice(0, 10)
          .map((task) => ({ taskName: task.title, checked: task.completed }));
        setToDoList(fetchedTasks);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const addTask = (taskName) => {
    const newTask = { taskName, checked: false };
    setToDoList([...toDoList, newTask]);
    Swal.fire({
      icon: "success",
      title: "Task Added!",
      text: `Task "${taskName}" has been added successfully.`,
    });
  };

  const deleteTask = (deleteTaskName) => {
    setToDoList(toDoList.filter((task) => task.taskName !== deleteTaskName));
    Swal.fire({
      icon: "success",
      title: "Task Deleted!",
      text: `Task "${deleteTaskName}" has been deleted successfully.`,
    });
  };

  const toggleCheck = (taskName) => {
    setToDoList((prevToDoList) =>
      prevToDoList.map((task) =>
        task.taskName === taskName ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const updateTask = (oldTaskName, newTaskName) => {
    setToDoList((prevToDoList) =>
      prevToDoList.map((task) =>
        task.taskName === oldTaskName
          ? { ...task, taskName: newTaskName }
          : task
      )
    );
    Swal.fire({
      icon: "success",
      title: "Task Updated!",
      text: `Task "${oldTaskName}" has been updated to "${newTaskName}" successfully.`,
    });
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const filteredTasks = toDoList.filter((task) => {
    if (filter === "all") return true;
    if (filter === "incomplete") return !task.checked;
    if (filter === "complete") return task.checked;
    return true;
  });

  return (
    <>
      <div className="container">
        <h1>ToDo App</h1>
        <div className="input-container">
          <TaskInput addTask={addTask} />
          <div className="filter-dropdown">
            <button className="filter-button">Filter</button>
            <div className="filter-options">
              <button onClick={() => handleFilterChange("all")}>
                All Tasks
              </button>
              <button onClick={() => handleFilterChange("incomplete")}>
                Incomplete Tasks
              </button>
              <button onClick={() => handleFilterChange("complete")}>
                Complete Tasks
              </button>
            </div>
          </div>
        </div>
        <div className="toDoList">
          <span>To do</span>
          <ul className="list-items text-white">
            {filteredTasks.map((task, key) => (
              <TaskItems
                task={task}
                key={key}
                deleteTask={deleteTask}
                toggleCheck={toggleCheck}
                updateTask={updateTask}
              />
            ))}
          </ul>
          {toDoList.length === 0 ? (
            <p className="notify">You are Done!</p>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
