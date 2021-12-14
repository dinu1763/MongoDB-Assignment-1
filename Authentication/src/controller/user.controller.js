const express = require('express');
const router = express.Router();

const User = require('../model/user.model');

router.get('/', async(req, res) =>{
    try{
        const user = await User.find().select("-password").lean().exec();
        return res.send(user);
    } catch(e){
        return res.status(500).send({message:e.message, status:'failed'});
    }
});

module.exports = router;