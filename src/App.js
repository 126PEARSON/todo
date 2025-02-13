import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { loadTasks, saveTasks } from './C2/localStorageUtil';
import TaskList from './C2/TaskList';
import AddTask from './C2/AddTask';
import Search from './C2/Search';
import Auth from './C2/Auth';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState(loadTasks());
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [theme, setTheme] = useState('light');
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const searchTasks = (query) => {
    setFilteredTasks(tasks.filter(task => task.text.toLowerCase().includes(query.toLowerCase())));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);
    setTasks(reorderedTasks);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className={theme}>
        <button onClick={toggleTheme}>Toggle Theme</button>
        {!authenticated ? (
          <Auth onAuth={() => setAuthenticated(true)} />
        ) : (
          <div>
            <h1>To-Do App</h1>
            <Search onSearch={searchTasks} />
            <AddTask onAdd={addTask} />
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="tasks">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {filteredTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <TaskList tasks={[task]} onToggle={toggleTask} onDelete={deleteTask} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;