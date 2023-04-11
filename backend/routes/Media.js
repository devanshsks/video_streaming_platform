import express from "express";
const router = express.Router();
import Media from "../models/media.js";
import verify from "../verifyToken.js";
import User from "../models/user.js";

router.get("/recommended", verify, async (req, res) => {
    const user_id = req.user.id;
    // all media that the user has not uploaded
    const uploads = await Media.find({ user: { $ne: user_id } });
    // add user info to each media
    const uploadsWithUserInfo = await Promise.all(
      uploads.map(async (upload) => {
        const user = await User.findById(upload.user);
        return { ...upload._doc, username: user.name };
      })
    );
    res.json(uploadsWithUserInfo);
  });

export default router;