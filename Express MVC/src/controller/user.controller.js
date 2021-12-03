const express = require('express');
const router = express.Router();
const crudController = require('./crud.controller');
const User = require('../model/user.model');

router.get('/', crudController.getAll(User));
router.get('/:id', crudController.getOne(User));
router.post('/', crudController.post(User));
router.patch('/:id', crudController.patch(User));
router.delete('/:id', crudController.deleteOne(User));


module.exports = router;