const express = require('express');
const router = express.Router();
const CheckedOut = require('../models/checkedOut.model');

router.get('/', async (req, res) => {
    try{

        const checkedOuts = await CheckedOut.find().lean().exec();

        return res.send(checkedOuts);

    } catch(err){
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});

router.get('/books', async (req, res) => {
    try{

        const checkedOuts = await CheckedOut.find({}, {book_id: 1}).populate('book_id').lean().exec();

        return res.send(checkedOuts);

    } catch(err){
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});

router.get('/:id', async (req, res) => {
    try{

        const checkedOut = await CheckedOut.findById(req.params.id).lean().exec();

        return res.send(checkedOut);

    } catch(err){
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});

router.post('/', async (req, res) => {
    try{

        const checkedOut = await CheckedOut.create(req.body);

        return res.status(201).send(checkedOut);

    } catch(err){
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});

router.patch('/:id', async (req, res) => {
    try{

        const checkedOut = await CheckedOut.findByIdAndUpdate(req.params.id, req.body, {new: true});

        return res.send(checkedOut);

    } catch(err){
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});

router.delete('/:id', async (req, res) => {
    try{

        const checkedOut = await CheckedOut.findByIdAndDelete(req.params.id);

        return res.send(checkedOut);

    } catch(err){
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});

module.exports = router;