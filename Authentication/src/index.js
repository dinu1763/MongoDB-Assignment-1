const express = require("express");

const app = express();
app.use(express.json())
const userController = require('./controller/user.controller');
const postController = require('./controller/post.controller');
const { register, login } = require('./controller/auth.controller');
const { body} = require('express-validator');


app.use('/register',
    body('name').notEmpty().withMessage("Name is Required"),
    body('email').isEmail().withMessage('Proper email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    register);

app.use('/login', body('email').isEmail().withMessage('Proper email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    login);

app.use('/user', userController);
app.use('/posts', postController);

module.exports = app;