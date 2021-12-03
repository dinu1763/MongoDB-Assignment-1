const express = require('express');
const router = express.Router();
const Book = require('../models/book.model');

router.get('/', async (req, res) => {
    try{

        const books = await Book.find().lean().exec();

        return res.send(books);

    } catch(err){
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});

router.get('/:id', async (req, res) => {
    try{

        const book = await Book.findById(req.params.id).lean().exec();

        return res.send(book);

    } catch(err){
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});



router.post('/', async (req, res) => {
    try{

        const book = await Book.create(req.body);

        return res.status(201).send(book);

    } catch(err){
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});

router.patch('/:id', async (req, res) => {
    try{

        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true});

        return res.send(book);

    } catch(err){
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});

router.delete('/:id', async (req, res) => {
    try{

        const book = await Book.findByIdAndDelete(req.params.id);

        return res.send(book);

    } catch(err){
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});

module.exports = router;