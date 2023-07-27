import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import CreateTask from './CreateTask';
import { Context } from './index';
import { Navigate } from 'react-router-dom';
import Loading from './Loading';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const [loading, setLoading] = useState(true);

  const addNewTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/users/user", {
        withCredentials: true
      });

      getTasks();
      setIsAuthenticated(true);
      setUser(response.data);
    } catch (error) {
      setIsAuthenticated(false);
      console.error('Error fetching tasks:', error.message);
    }
  };

  const getTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/tasks", {
        withCredentials: true
      });

      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/tasks/${id}`, {
        withCredentials: true,
      });
      const updatedTasks = tasks.filter(task => task._id !== response.data._id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  }

  const updateTask = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:3001/api/tasks/${id}`, {
        isComplete: !tasks.find(task => task._id === id).isComplete
      }, {
        withCredentials: true
      });

      const updatedTasks = tasks.map((task) =>
        task._id === id ? { ...task, isComplete: !task.isComplete } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  }

  if (loading) {
    return <Loading />
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />
  }

  return (
    <div className="h-screen w-screen grid place-items-center">
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className='flex m-4'>
            <h3 className={task.isComplete ? "line-through text-red-500" : "no-underline"}>{task.task}</h3>
            <button className="text-white ml-5 bg-red-600 rounded px-3" onClick={() => { deleteTask(task._id) }}>Delete</button>
            <button className="text-white ml-5 rounded px-3 bg-green-700" onClick={() => { updateTask(task._id) }}>Done</button>
          </li>
        ))}
      </ul>
      <CreateTask onTaskCreated={addNewTask} />
    </div>
  )
}

export default Home;