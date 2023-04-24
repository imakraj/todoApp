import express from 'express';
import { User } from '../models/userModel.js'
import {login, register, getUserDetails, logout } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

// router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router.get("/user", isAuthenticated, getUserDetails);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

export default router;