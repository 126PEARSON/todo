import React from 'react';
import Task from './Task';
import './TaskList.css';

const TaskList = ({ tasks, onToggle, onDelete }) => (
  <div>
    {tasks.map(task => (
      <Task key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
    ))}
  </div>
);

export default TaskList;
