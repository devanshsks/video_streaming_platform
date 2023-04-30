import express from "express";
const router = express.Router();
import Media from "../models/media.js";
import User from "../models/user.js";
import verify from "../verifyTokenAdmin.js";

router.post("/getusers", verify, async(req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
  });
  
router.post("/deleteuser", verify, async(req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.body.id);
        res.status(200).json("User has been deleted");
    } catch (error) {
        return res.status(500).json(error);
    }
});
  
  // ban user (if user is banned, then unban user)
router.post("/banuser", verify, async(req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.body.id,
            { $set: { status: req.body.status } },
        );
        res.status(200).json("Ok..");
    } catch (err) {
        return res.status(500).json(err);
    }
});
  
  // get al media 
router.post("/getmedia", verify, async(req, res) => {
    try {
        const media = await Media.find({});
        await User.populate(media, { path: "user" });
        res.status(200).json(media);
    } catch (err) {
        return res.status(500).json(err);
    }
});
  
  
  // delete media
router.post("/deletemedia", verify, async(req, res) => {
    try {
        await Media.findByIdAndDelete(req.body.id);
        res.status(200).json("Media has been deleted...");
    } catch (err) {
        return res.status(500).json(err);
    }
});
   
export default router;