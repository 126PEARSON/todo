import React, { useState } from 'react';

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !dueDate) return; // Check that text and dueDate are not empty
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
          required // Ensures that the input is not empty
        />
      </div>
      <div>
        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required // Ensures that a date is selected
        />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
