import express from "express";
const router = express.Router();
import Media from "../models/media.js";
import verify from "../verifyToken.js";

router.post("/add_content", verify, async (req, res) => {
    const tags = req.body.tags.split(",");
    const filteredTags = tags.filter((tag) => tag !== "").map((tag) => tag.trim())
    const newMedia = new Media({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      imgUrl: req.body.imgUrl,
      mediaUrl: req.body.mediaUrl,
      type: req.body.type,
      private: req.body.isPrivate,
      tags: filteredTags,
    })

    try{
      const media = await newMedia.save();
      res.json({success: true});
    }
    catch (err){
      console.log(err);
    }
});

export default router;