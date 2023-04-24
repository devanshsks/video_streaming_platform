import PlayList from "../models/playlist.js";
import express from "express";
const router = express.Router();
import verify from "../verifyToken.js";

router.get("/all", verify, async (req, res) => {
    const userId = req.user.id;
    try {
      const playlists = await PlayList.find({ user: userId });
      res.status(200).json(playlists);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post("/add", verify, async (req, res) => {
    const userId = req.user.id;
    const newPlaylist = new PlayList({
      user: userId,
      playlistName: req.body.playlistName,
    });
    try {
      const playlist = await newPlaylist.save();
      res.status(201).json(playlist);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post("/list", verify, async (req, res) => {
    const userId = req.user.id;
    try {
        const playlists = await PlayList.find({ user: userId });
        res.status(200).json(playlists);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/addto", verify, async(req, res) => {
    const { playlistId, mediaId } = req.body;
    const userId = req.user.id;
    try {
        const result = await PlayList.findById(playlistId);
        if(result.media.includes(mediaId)){
            return res.status(422).json({error: "Already in playlist"});
        }
        else{
            await PlayList.findByIdAndUpdate(
                playlistId,
                {
                    $addToSet: {
                        media: mediaId,
                    },
                },
                { new: true },
            );
            res.json("Successfully added to playlist");
        }
    } catch (err) {
        res.status(422).json({ error: err });
    }
  });

router.post("/get", verify, async(req, res) => {
    const { playlistId } = req.body;
    const userId = req.user.id;
    const result = await PlayList.findById(playlistId);
    try {
        if(result.isPrivate && result.user != userId){
            return res.status(422).json({error: "Not authorised"});
        }
        else{
            res.json(result);
        }
    } catch (err) {
        res.status(422).json({ error: err });
    }
});

router.post("/delete", verify, async(req, res) => {
    const { playlistId } = req.body;
    const userId = req.user.id;
    try {
        const result = await PlayList.findById(playlistId);
        if(result.user != userId){
            return res.status(422).json({ error: "Not authorized" });
        }
        else{
            await PlayList.findByIdAndDelete(playlistId);
            res.json("Successfully deleted your playlist");
        }
    } catch (err) {
        res.status(422).json({ error: err});
    }
  });

  router.post("/removefrom", verify, async(req, res) => {
    const { playlistId, mediaId } = req.body;
    const userId = req.user.id;
    try {
        const result = await PlayList.findById(playlistId);
        if(result.user != userId){
            console.log(result.user);
            console.log(userId);
            return res.status(422).json({ error: "Not authorized" });
        }
        else{
            await PlayList.findByIdAndUpdate(
                playlistId,
                {
                    $pull: {
                        media: mediaId,
                    },
                },
                { new: true},
            );
            res.status(200).json("Successfully removed from playlist");
        }
    } catch (err) {
        res.status(422).json({ error: err });
    }
});

export default router;