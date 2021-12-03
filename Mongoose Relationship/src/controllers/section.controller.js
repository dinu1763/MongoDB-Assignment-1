const express = require('express');
const router = express.Router();
const Section = require('../models/section.model');
const Book = require('../models/book.model');
const CheckedOut = require('../models/checkedOut.model');

router.get('/', async (req, res) => {
    try{

        const sections = await Section.find().lean().exec();

        return res.send(sections);

    } catch(err){
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});

router.get('/:id', async (req, res) => {
    try{

        const sections = await Section.findById(req.params.id).lean().exec();

        return res.send(sections);

    } catch(err){
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});

router.get('/:id/books', async (req, res) => {
    try{

        const books = await Book.find({section_id: req.params.id}).lean().exec();

        return res.send(books);

    } catch(err){
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});

router.get('/:id/books/notCheckedOut', async (req, res) => {
    try{
        const checked = await CheckedOut.find({}, {book_id: 1, _id:0}).lean().exec();
        let checkedOut = [];
        checked.forEach(({book_id}) => checkedOut.push(book_id));
        const books = await Book.find({$and: [{section_id: req.params.id}, {_id: {$nin: checkedOut}}]}).lean().exec();

        return res.send(books);

    } catch(err){
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});

router.get('/:id/author/:author_id/books', async (req, res) => {
    try{

        const books = await Book.find({section_id: req.params.id, author_id: req.params.author_id}).lean().exec();
        return res.send(books);

    } catch(err){
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});

router.post('/', async (req, res) => {
    try{

        const section = await Section.create(req.body);
        return res.status(201).send(section);

    } catch(err){
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});

router.patch('/:id', async (req, res) => {
    try{

        const section = await Section.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.send(section);

    } catch(err){
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});

router.delete('/:id', async (req, res) => {
    try{

        const section = await Section.findByIdAndDelete(req.params.id);
        return res.send(section);

    } catch(err){
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});

module.exports = router;