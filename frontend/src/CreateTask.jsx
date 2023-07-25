import React, { useState } from 'react';
import axios from 'axios';

const CreateTask = ({ onTaskCreated }) => {
  const [task, setTask] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/tasks/new", {
        task
      });

      setTask('');

      console.log(response.data);
      onTaskCreated(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="text-white m-4 mr-0" htmlFor="newTask">New Task</label>
      <input className="ml-2 rounded text-black" id="newTask" type="text" name="task" value={task} onChange={(e) => setTask(e.target.value)} />
      <button className="text-white ml-2 bg-slate-500 px-3 rounded" type="submit">Submit</button>
    </form>
  )
}

export default CreateTask;