const express = require('express');
const router = express.Router();

const Post = require('../model/post.model');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, async(req, res) =>{
    try{
        const user = req.user;
        const posts = await Post.find({user: user.user._id}).lean().exec();
        return res.send(posts);
    }catch(e){
        return res.status(500).send({message:e.message, status:'failed'});
    }
});

router.post('/', authenticate, async(req, res) =>{
    try{
        const user = req.user;
        const posts = await Post.create({
            title:req.body.title,
            body:req.body.body,
            user:user.user._id,
        });
        return res.send(posts);
    }catch(e){
        return res.status(500).send({message:e.message, status: 'failed'});
    }
});

module.exports = router;