import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import authroute from "./routes/Auth.js"
const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB connection successful"))
.catch((err) => {
    console.log(err);
});

app.use(express.json());

app.use("/api/auth", authroute);

app.listen(process.env.PORT, () => {
    console.log("Backend server is running");
});


