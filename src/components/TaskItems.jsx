import React, { useState } from "react";
import { MdDeleteSweep, MdEdit } from "react-icons/md";

function TaskItems({ task, deleteTask, toggleCheck, updateTask }) {
  const [newTaskName, setNewTaskName] = useState(task.taskName);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (event) => {
    setNewTaskName(event.target.value);
  };

  const handleUpdate = () => {
    updateTask(task.taskName, newTaskName);
    setIsEditing(false);
  };

  return (
    <li className="items">
      <div className="items-text">
        <input
          type="checkbox"
          checked={task.checked}
          onChange={() => toggleCheck(task.taskName)}
        />
        {isEditing ? (
          <input type="text" value={newTaskName} onChange={handleInputChange} />
        ) : (
          <p className={task.checked ? "isChecked" : ""}>{task.taskName}</p>
        )}
        
      </div>
      <div className="button-group">
        {isEditing ? (
          <button onClick={handleUpdate}>Save</button>
        ) : (
          <MdEdit className="edit-icon" onClick={() => setIsEditing(true)} />
        )}
        <MdDeleteSweep
          className="delete-icon"
          onClick={() => deleteTask(task.taskName)}
        />
      </div>
    </li>
  );
}

export default TaskItems;
