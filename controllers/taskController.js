import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/taskModel.js";
import { User } from "../models/userModel.js";

export const getTasks = async (req, res, next) => {
    const userId = req.user._id;

    const tasks = await Task.find({ user: userId });

    res.status(200).json({
        success: true,
        tasks
    })
};

export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        const task = await Task.create({
            title,
            description,
            user: req.user
        });

        res.status(201).json({
            success: true,
            message: "Task Created"
        });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const id = req.params.id;

        const task = await Task.findById(id);
    
        if (!task) return next(new ErrorHandler("Task Not Found", 404))
    
        task.isCompleted = !task.isCompleted;
    
        await task.save();
    
        res.status(200).json({
            success: true,
            message: "Task Updated"
        });
    } catch (error){
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const id = req.params.id;

        const task = await Task.findById(id);
    
        if (!task) return next(new ErrorHandler("Task Not Found", 404))
    
        await task.deleteOne();
    
        res.status(200).json({
            success: true,
            message: "Task Deleted"
        });
    } catch (error){
        next(error);
    }
};