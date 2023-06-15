import express from "express";
const router = express.Router();
import RoomList from "../models/room.js"
import verify from "../verifyToken.js";

router.get('/:roomId', verify, async(req, res) => {
    const roomId = req.params.roomId;
    try {
        const result = await RoomList.findById(roomId);
        res.json(result);
    } catch (err) {
        return res.status(422).json({ error: err });
    }
})

export default router;