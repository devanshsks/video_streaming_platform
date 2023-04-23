import express from "express";
const router = express.Router();
import Media from "../models/media.js";
import verify from "../verifyToken.js";
import mongoose from "mongoose";
import User from "../models/user.js";

router.post("/addtoFavorites", verify, async (req, res) => {
    const { mediaId } = req.body;
    const userId = req.user.id;
    try {
        await User.findByIdAndUpdate(
            userId,
            {
              $addToSet: {
                favorites: mediaId,
              },
            },
            { new: true });
            res.json("Successfully added to favorites");
    } catch (err) {
        res.status(422).json({error: err});
    }
  });
  
  router.post("/removefromFavorites", verify, async (req, res) => {
    const { mediaId } = req.body;
    const userId = req.user.id;
    try {
        await User.findByIdAndUpdate(
            userId,
            {
              $pull: {
                favorites: mediaId,
              },
            },
            { new: true });
            res.json("Successfully removed from favorites");
    } catch (err) {
        res.status(422).json({error: err});
    }
  });
  
  router.post("/isFavorite", verify, async (req, res) => {
    const { mediaId } = req.body;
    const userId = req.user.id;
    try {
        const result = await User.findById(userId);
        if (result.favorites.includes(mediaId)) {
            res.json(true);
          } else {
            res.json(false);
          }
    } catch (error) {
        res.status(422).json({ error: error });
    }

  });

  export default router;