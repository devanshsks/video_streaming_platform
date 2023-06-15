import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import authroute from "./routes/Auth.js"
import uploadroute from "./routes/Upload.js"
import mediaroute from "./routes/Media.js"
import userroute from "./routes/User.js"
import playlistroute from "./routes/PlayList.js"
import adminRoute from "./routes/Admin.js";
import roomRoute from "./routes/Room.js"
import { Server } from "socket.io";
import RoomSocket from "./socket/Room.js";
import Stream from "./socket/Stream.js";
import { Message } from "./socket/Message.js";

const io = new Server(8000, {
    cors: {
      origin: ["http://localhost:3000", "https://admin.socket.io", "http://localhost:3001"],
      methods: ['GET', 'POST'],
    },
});

io.on("connection", (socket) => {
    RoomSocket(io, socket);
    Message(io, socket);
    Stream(io, socket);
})

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
app.use("/api/media",mediaroute);
app.use("/api/user",userroute);
app.use("/api/playlists",playlistroute);
app.use('/api/admin', adminRoute);
app.use('/api/room', roomRoute);

app.listen(process.env.PORT, () => {
    console.log("Backend server is running");
});


