const express = require('express');
const router = express.Router();

const Gallery = require('../model/gallery.model');
const upload = require('../middlewares/upload');
const deleteFile = require('../middlewares/deleteFile');
const path = require('path');

router.get('/',async(req, res) =>{
    try{
        const galleries = await Gallery.find().lean().exec();
        return res.send(galleries);
    }catch(e) {
        return res.status(500).send({message: e.message, status: 'failed'});
    }
});

router .post('/', upload.array('images', 5), async(req, res) =>{
    try{
        const image_urls = req.files.map(file => file.path);
        const gallery = await Gallery.create({
            user_id: req.body.user_id,
            images:image_urls
        })
        return res.send(gallery);
    }catch(err) {
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});


router.post('/:id/images', upload.array('images', 5), async(req, res)=>{
    try{
        const image_urls = req.files.map(file => file.path);
        const gallery = await Gallery.findById(req.params.id).lean().exec();
        image_urls.push(...gallery.images);
        const updateGallery = await Gallery.findByIdAndUpdate(req.params.id, {"images": image_urls}, {new: true}).lean().exec();   
        return res.send(updateGallery);
    }catch(err) {
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});

router.delete('/file', async(req, res) =>{
    try{
        const filePath = path.join(__dirname, '../uploads', req.query.fileName);
        deleteFile(filePath);
        let user = await Gallery.findOne({images:filePath}, {}).lean().exec();
        let newFilePaths = user.images.filter(image => image != filePath);
        const gallery = await Gallery.findByIdAndUpdate(user.__id, {'images': newFilePaths}, {new: true}).lean().exec();
        return res.send(gallery);
    }catch(err) {
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});


module.exports = router;