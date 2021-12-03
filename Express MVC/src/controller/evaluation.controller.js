const express = require('express');
const router = express.Router();
const crudController = require('./crud.controller');
const Evaluation = require('../model/evaluation.model');
const Student = require('../model/student.model');


router.get('/', crudController.getAll(Evaluation));
router.get('/:id', crudController.getOne(Evaluation));
router.post('/', crudController.post(Evaluation));
router.patch('/:id', crudController.patch(Evaluation));
router.delete('/:id', crudController.deleteOne(Evaluation));

router.get('/:id/students', async(req, res) =>{
    try {
        const students = await Student.find({'results.evaluation_id': req.params.id});
        return res.send(students);
    }catch (e){
        return res.status(500).send({message: e.message, status: 'failed'});
    }
});

router.get('/:id/student/highest', async (req, res) =>{
    try {
        const students = await Student.find({'results.evaluation_id': req.params.id}, {}).populate('user_id').sort({'results.marks': -1}).lean().limit(1).exec();
        return res.send(students);
    }catch (e){
        return res.status(500).send({message: e.message, status: 'failed'});
    }
});

module.exports = router;