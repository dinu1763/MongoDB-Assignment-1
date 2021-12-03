const express = require('express');
const router = express.Router();
const crudController = require('./crud.controller');
const Topic = require('../model/topic.model');

router.get('/', crudController.getAll(Topic));
router.get('/:id', crudController.getOne(Topic));
router.post('/', crudController.post(Topic));
router.patch('/:id', crudController.patch(Topic));
router.delete('/:id', crudController.deleteOne(Topic));


module.exports = router;