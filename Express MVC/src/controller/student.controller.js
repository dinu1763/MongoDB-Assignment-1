const express = require('express');
const router = express.Router();
const crudController = require('./crud.controller');
const Student = require('../model/student.model');


router.get('/', crudController.getAll(Student));
router.get('/:id', crudController.getOne(Student));
router.post('/', crudController.post(Student));
router.patch('/:id', crudController.patch(Student));
router.delete('/:id', crudController.deleteOne(Student));

module.exports = router;