const express = require('express');
const router = express.Router();
const Author = require('../models/author.model');
const Book = require('../models/book.model');

router.get('/', async (req, res) =>{
    try {
        const author = await Author.find().lean().exec();
        return res.send(author);
    }catch (e){
        return res.status(500).send({message: e.message, status: 'failed'});
    }
});

router.get('/:id', async (req, res) => {
    try{

        const author = await Author.findById(req.params.id).lean().exec();

        return res.send(author);

    } catch(err){
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});

router.get('/:id/books', async (req, res) => {
    try{
        const books = await Book.find({author_id: req.params.id}).lean().exec();

        return res.send(books);

    } catch(err){
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});

router.post('/', async (req, res) => {
    try{

        console.log("hello");

        const author = await Author.create(req.body);

        return res.status(201).send(author);

    } catch(err){
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});

router.patch('/:id', async (req, res) => {
    try{

        const author = await Author.findByIdAndUpdate(req.params.id, req.body, {new: true});

        return res.send(author);

    } catch(err){
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});

router.delete('/:id', async (req, res) => {
    try{

        const author = await Author.findByIdAndDelete(req.params.id);

        return res.send(author);

    } catch(err){
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});


module.exports = router;