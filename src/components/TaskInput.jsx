import React, { useState } from "react";

function TaskInput({ addTask }) {
  const [task, setTask] =useState("");

  const handleInputValue = (event) => {
    setTask(event.target.value);
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    if (task.trim() === "")  return;

    addTask(task);
    setTask("");
  };

  return (
    <form className="inputField" onSubmit={handleAddTask}>
      <input
        type="text"
        placeholder="Add Tasks"
        value={task}
        onChange={handleInputValue}
      />
      <button>+</button>
    </form>
  );
}

export default TaskInput;
