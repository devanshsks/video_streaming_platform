import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import authroute from "./routes/Auth.js"
import uploadroute from "./routes/Upload.js"
const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB connection successful"))
.catch((err) => {
    console.log(err);
});

app.use(express.json());

app.use("/api/auth", authroute);
app.use("/api/upload",uploadroute);

app.listen(process.env.PORT, () => {
    console.log("Backend server is running");
});


