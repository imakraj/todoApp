import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "todoDB",
    }).then((c) => {
        console.log(`DB is Connected with ${c.connection.host}`);
    }).catch((e) => {
        console.log(e);
    })
};

