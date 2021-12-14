const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { validationResult } = require('express-validator');

const newToken = (user) => {
    return jwt.sign({user}, process.env.JWT_ACCESS_KEY);
}

const register = async (req, res) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const newErrors = errors.array().map(({param, msg}) =>{
            return {[param]:msg};
        });
        return res.status(400).json({errors:newErrors});
    }
    try{
        let user = await User.findOne({email:req.body.email}).lean().exec()

        if(user){
            return res.status(400).json({message:"Email exists!"});
        }
        user = await User.create(req.body);
        const token = newToken(user);

        return res.status(201).json({user:user, token:token});
    } catch(e){
        res.status(500).send({ message: e.message, status: 'failed' });
    }
}

const login = async(req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const newErrors = errors.array().map(({param, msg})=>{
            return {[param]: msg};

        });
        return res.status(400).json({errors:newErrors});
    }
    try{
        let {email, password} = req.body;
        let user = await User.findOne({email});
        if(!user){
            return res.status(401).send({message:"Email or Password error"});

        }
        const match = await user.checkPassword(password);
        if(!match){
            return res.status(401).send({message:"Email error", status:'failed'});
        }
        const token = newToken(user);
        return res.json({user, token});
    }catch(e){
        res.status(500).send({ message: e.message, status: 'failed' });

    }
}

module.exports = { register, login };