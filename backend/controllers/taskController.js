const Task = require("../models/taskModel")

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const newTask = async (req, res) => {
    const { task } = req.body;

    try {
        const newTask = new Task({ task });
        await newTask.save();
        res.status(200).json(newTask);
    } catch (err) {
        res.status(500).json(err.message);
    }
}


const deleteTask = async (req, res) => {
    const taskId = req.params.id;

    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(deletedTask);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const updateTask = async (req, res) => {
    const taskId = req.params.id;
    const updatedTaskData = req.body;
    console.log(updatedTaskData);

    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, updatedTaskData);

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

module.exports = {
    getTasks,
    newTask,
    updateTask,
    deleteTask
}