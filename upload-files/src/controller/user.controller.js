const express = require("express");
const User = require("../model/user.model");
const router = express.Router();
const upload = require("../middlewares/upload");

router.post("/", upload.single("image_urls"), async (req, res)=>{
    try {
        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email:req.body.email,
            image_urls: req.file.path,
        });
        return res.status(201).json({user});
    } catch (e){
        return res.status(500).json({status: "failed", message: e.message});
    }

});

router.post("/gallery", upload.any("image_urls"), async (req, res)=>{
    const filePaths = req.files.map(file => file.path)
    try {
        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email:req.body.email,
            image_urls: filePaths,
        });
        return res.status(201).json({user});
    } catch (e){
        return res.status(500).json({status: "failed", message: e.message});
    }

});


module.exports = router;