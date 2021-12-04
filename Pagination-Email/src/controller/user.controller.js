const express = require("express");
const User = require("../model/user.model");
const router = express.Router();
const sendMail = require("../utils/send-mail")

router.post("/", async (req, res)=>{
    try {
        const user = await User.create(req.body);
        sendMail('a@a.com', 'b@b.com','Hi This is message','Welcome',"<h1>Haha</h1>")
        return res.status(201).json({user});
    } catch (e){
        return res.status(500).json({status: "failed", message: e.message});
    }

});

router.get('/', async (req, res) =>{
    try {
        const page = +req.query.page || 1;
        const size = +req.query.size || 2;
        const skip = (page - 1)*size;
        const user = await User.find().skip(skip).limit(size).lean().exec();
        return res.send(user);
    } catch (e){
        return res.status(500).json({status: "failed", message: e.message});
    }

});

module.exports = router;