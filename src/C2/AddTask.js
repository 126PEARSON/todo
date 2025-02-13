import React, { useState } from 'react';
import './AddTask.css';

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !dueDate) return; 
    onAdd({ text, dueDate, completed: false });
    setText('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="task">Task</label>
        <input
          id="task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter task"
          required 
        />
      </div>
      <div>
        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required 
        />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
