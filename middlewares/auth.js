import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next)=>{
    const { token } = req.cookies;

    if (!token) return res.status(404).json({
        success: false,
        message: "Login First"
    })

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decodedData._id);

    //saving the user object in request
    req.user = user;
    next()
}