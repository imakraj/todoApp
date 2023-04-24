import { app } from "./app.js";
import { connectDB } from './data/database.js';

//Database Connectivity
connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} Mode`);
})