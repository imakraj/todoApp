import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "todoDB",
    }).then(() => {
        console.log("DB is Connected!");
    }).catch((e) => {
        console.log(e);
    })
};

