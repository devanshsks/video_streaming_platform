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

  router.post("/favorites", verify, async (req, res) => {
    const userId = req.user.id;
    try {
        const result = await User.findById(userId);
        const favorites = result.favorites;
        const media = [];
        favorites.forEach(async (favorite) => {
            const mediadetails = await Media.findById(favorite);
            media.push(mediadetails);
          });
          const interval = setInterval(async() => {
            if (media.length === favorites.length) {
              const mediasWithUserInfo = await Promise.all(
                media.map(async (m) => {
                  const user = await User.findById(m.user);
                  return { ...m._doc, username: user.name };
                })
              );
              res.json(mediasWithUserInfo);
              clearInterval(interval);
              return;
            }
          }, 100);
    } catch (err) {
        res.status(422).json({ error: err });
    }
  });

  router.post("/getuserpublic", verify, async(req, res) => {
    const { userId } = req.body;
    if (mongoose.Types.ObjectId.isValid(userId)) {
      try {
        const result = await User.findById(userId);
        const user = {
          username: result.name,
          email: result.email,
          timestamp: result.timestamp,
        }
        res.json(user);    
      } catch (err) {
        return res.status(422).json({ error: err });
      }
    } else {
      res.json({ error: "Invalid User Id" });
    }
  });

  export default router;