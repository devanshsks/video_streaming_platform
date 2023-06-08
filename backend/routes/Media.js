import express from "express";
const router = express.Router();
import Media from "../models/media.js";
import verify from "../verifyToken.js";
import User from "../models/user.js";
import httpProxy from "http-proxy";
import mongoose from "mongoose";

router.get("/userAll", verify, async (req, res) => {
  const user_id = req.user.id;
  const uploads = await Media.find({ user: user_id });
  res.json(uploads);
});

router.get("/recommended", verify, async (req, res) => {
    const user_id = req.user.id;
    // all media that the user has not uploaded
    const uploads = await Media.find({ user: { $ne: user_id } , private: false});
    // add user info to each media
    const uploadsWithUserInfo = await Promise.all(
      uploads.map(async (upload) => {
        const user = await User.findById(upload.user);
        return { ...upload._doc, username: user.name };
      })
    );
    res.json(uploadsWithUserInfo);
  });

  router.post("/search", verify, async (req, res) => {
    const user_id = req.user.id;
    const { query, sort, filter } = req.body;
    // console.log(query);
    // console.log(sort);
    // console.log(filter);
    if (query === "") {
      console.log("adf");
      res.json([]);
      return;
    }
    // title, description, tags match query, public, not user's media
    // sort "NEWEST", "OLDEST", "MOST_STRAMED", "MOST_UPVOTE"
    // filter "ALL", "VIDEO", "AUDIO"

    const filterQuery = filter === "all" ? {} : { type: filter };
  
    const uploads = await Media.find({
      $and: [
        { $or : [
          // if public 
          { private: false },
          // if private and user is owner
          { $and: [{ private: true }, { user: user_id }] },
        ] },
        {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { tags: { $regex: query, $options: "i" } },
          ],
        },
        {
          ...filterQuery,
        },
      ],
    });
  
    // sort
    if (sort === "NEWEST") {
      uploads.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sort === "OLDEST") {
      uploads.sort((a, b) => a.createdAt - b.createdAt);
    } else if (sort === "MOST_STRAMED") {
      uploads.sort((a, b) => b.streams - a.streams);
    } else if (sort === "MOST_UPVOTE") {
      uploads.sort((a, b) => b.upvotes - a.upvotes);
    }
    const maxResult = 30;
    uploads.splice(maxResult);
  
    const uploadsWithUserInfo = await Promise.all(
      uploads.map(async (upload) => {
        const user = await User.findById(upload.user);
        return { ...upload._doc, username: user.name };
      })
    );
    // console.log(uploadsWithUserInfo);
    res.json(uploadsWithUserInfo);
  });

  router.post("/get", verify, async (req, res) => {
    const media_id = req.body.mediaId;
  
    try {
      const media = await Media.findById(media_id);
      const mediaWithUserInfo = await getMediaWithUserInfo(media);
      if (!media.private) {
        res.json(mediaWithUserInfo);
      } else {
        const user_id = req.user.id;
        if (media.user == user_id) {
          res.json(mediaWithUserInfo);
        } else {
          res.status(403).json("This media is private");
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.put("/:id/like", verify, async (req, res) => {
    const media_id = req.params.id;
    const user_id = req.user.id;
    try {
      const media = await Media.findById(media_id);
      if (!media) {
        res.status(404).json("Media not found");
      } else {
        if (media.upvotes.includes(user_id)) {
          res.status(400).json("Already Liked");
        } else {
          await Media.findByIdAndUpdate(media_id, {
            $push: { upvotes: user_id },
          });
          await Media.findByIdAndUpdate(media_id, {
            $pull: { downvotes: user_id },
          });
          res.status(200).json("Liked");
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.put("/:id/dislike", verify, async (req, res) => {
    const media_id = req.params.id;
    const user_id = req.user.id;
    try {
      const media = await Media.findById(media_id);
      if (!media) {
        res.status(404).json("Media not found");
      } else {
        if (media.downvotes.includes(user_id)) {
          res.status(400).json("Already Disliked");
        } else {
          await Media.findByIdAndUpdate(media_id, {
            $push: { downvotes: user_id },
          });
          await Media.findByIdAndUpdate(media_id, {
            $pull: { upvotes: user_id },
          });
          res.status(200).json("Disliked");
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/forcedownload/:id", async (req, res) => {
    const mediaId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(mediaId)) {
      res.status(400).json("Invalid media id");
      return;
    }
  
    const media = await Media.findById(mediaId);
    if (!media) {
      res.status(404).json("Media not found");
      return;
    }
    const media_url = media.mediaUrl;
    // set a proxy to force download
    const proxy = httpProxy.createProxyServer({
      target: media_url,
      changeOrigin: true,
      ws: true,
    });
  
    proxy.on('proxyRes', function (proxyRes, req, res) {
      // forcing download
      proxyRes.headers['Content-Disposition'] = 'attachment';
    });
    
  
    proxy.on("error", (err, req, res) => {
      console.log(err);
      res.status(500).send("Something went wrong.");
    });
  
    proxy.web(req, res);
  });
  
  const getMediaWithUserInfo = async (media) => {
    const user = await User.findById(media.user);
    return { ...media._doc, username: user.name };
  };

export default router;