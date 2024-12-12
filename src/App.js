import React, { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from './api';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const getTasks = async () => {
      const { data } = await fetchTasks();
      setTasks(data);
    };
    getTasks();
  }, []);

  const handleAddTask = async () => {
    const { data } = await createTask({ title: newTask });
    setTasks([...tasks, data]);
    setNewTask('');
  }


  const handleToggleTask = async (id, completed) => {
    const { data } = await updateTask(id, { completed: !completed });
    setTasks(tasks.map((task) => (task._id === id ? data : task)));
  }

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task._id !== id));

  };

  return (
    <div>
      <h1>
        Task Management
      </h1>
      <div className='note'>
        <div className='.note-footer'>
          <input type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task"
          ></input>
        </div>
        <div className='.notes-list'>
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <span
                style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                onClick={() => handleToggleTask(task._id, task.completed)}
              >
                {task.title}
              </span>
              <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div >

  )
};
export default App;