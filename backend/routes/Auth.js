import express from "express";
import User from "../models/user.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            res.status(401).json("User not found");
            return
        }

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const databasepassword = bytes.toString(CryptoJS.enc.Utf8);
        if(databasepassword !== req.body.password){
            res.status(401).json("password did not match");
            return
        }

        if(user.status === false){
            res.status(401).json("Your account has been banned!");
            return
        }
        
        const accessToken = jwt.sign(
            {id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET_KEY,
            {expiresIn: "5d"}
        );
        const {password, ...info} = user._doc;
        res.status(200).json({...info, accessToken});

    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/register", async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
        ).toString(),
    })
    try {
        const user = await User.findOne({email: req.body.email});
        if(user){
            res.status(401).json("email already exists");
        }
        else{
            const data = await newUser.save();
            res.status(201).json(data);
        }
    } catch (error) {
        res.send(err);
    }
});

router.post("/loginadmin", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if(!user){
        res.status(401).json("Wrong password or username!");
        return
      }
  
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
      if(originalPassword !== req.body.password){
        res.status(401).json("Wrong password or username!");
        return
      }
  
      if(!user.isAdmin){
        res.status(401).json("You are not an admin!");
        return
      }
      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.SECRET_KEY,
        { expiresIn: "5d" }
      );
  
      const { password, ...info } = user._doc;
  
      res.status(200).json({ ...info, accessToken });
    } catch (err) {
      res.status(500).json(err);
    }
  });

export default router;