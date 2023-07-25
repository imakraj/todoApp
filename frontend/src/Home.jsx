import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateTask from './CreateTask';

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const addNewTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  //  console.log(tasks);

  const delteTask = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/tasks/${id}`);
      const updatedTasks = tasks.filter(task => task._id !== response.data._id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  const updateTask = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:3001/api/tasks/${id}`, {
        isComplete: !tasks.find(task => task._id === id).isComplete
      });
      const updatedTasks = tasks.map((task) =>
        task._id === id ? { ...task, isComplete: !task.isComplete } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  return (
    <>
      <div className="h-16 w-screen bg-slate-700 grid place-items-center fixed">
        <h1 className="text-center text-lg font-bold text-white">ToDo App</h1>
      </div>

      <div className="h-screen w-screen text-white grid place-items-center">
        <ul>
          {tasks.map((task) => (
            <li key={task._id} className='flex m-4'>
              <h3 className={task.isComplete ? "line-through text-red-500" : "no-underline"}>{task.task}</h3>
              <button className="text-white ml-5 bg-red-600 rounded px-3" onClick={() => { delteTask(task._id) }}>Delete</button>
              <button className="text-white ml-5 rounded px-3 bg-green-700" onClick={() => { updateTask(task._id) }}>Done</button>
            </li>
          ))}
        </ul>
        <CreateTask onTaskCreated={addNewTask} />
      </div>
    </>
  )
}

export default Home;