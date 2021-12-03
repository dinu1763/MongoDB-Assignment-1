const { model } = require("mongoose");

const getAll = (model) => async (req, res) =>{
    try {
        const items = await model.find().lean().exec();
        return res.send(items);
    } catch (e){
        return res.status(500).send({message: e.message, status: 'failed'});
    }
};

const getOne = (model) => async (req, res) =>{
    try{
        const item = await model.findById(req.params.id).lean().exec();
        return res.send(item);
    }catch (e){
        return res.status(500).send({message: e.message, status: 'failed'});
    }
};


const post = (model) = async (req, res) =>{
    try {
        const item = await model.create(req.body);
        return res.status(201).send(item);
    }catch (e){
        return res.status(500).send({message: e.message, status: 'failed'});
    } 
};

const patch = (model) => async (req, res) => {
    try {
        const item = await model.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.send(item);
    }catch (e){
        return res.status(500).send({message: e.message, status: 'failed'});
    }
};


const deleteOne = (model) => async (req, res) => {
    try {
        const item = await model.findByIdAndDelete(req.params.id);
        return res.send(item);
    }catch (e){
        return res.status(500).send({message: e.message, status: 'failed'});
    }
};

module.exports = { getAll, getOne, post, patch, deleteOne};