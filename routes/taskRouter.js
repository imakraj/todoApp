import express from 'express';
import {getTasks, newTask, updateTask, deleteTask} from '../controllers/taskController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.get("/user", isAuthenticated, getTasks);
router.post("/new", isAuthenticated, newTask);

// router.put("/:id", isAuthenticated, updateTask);
// router.delete("/:id", isAuthenticated, deleteTask);

router.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask)

export default router;