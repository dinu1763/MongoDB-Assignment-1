const express = require("express");

const userController = require('./controller/user.controller');
const galleryController = require('./controller/gallery.controller');

const app = express();
app.use(express.json())

app.use('/user', userController);
app.use('/gallery', galleryController);

module.exports = app;