const express = require('express');
const app = express();


app.use(express.json());

const connect = require('./configs/db');


const userController = require('./controller/user.controller');
const topicController = require('./controller/topic.controller');
const studentController = require('./controller/student.controller');
const evaluationController = require('./controller/evaluation.controller');

app.use('/user', userController);
app.use('/topic', topicController);
app.use('/student', studentController);
app.use('/evaluation', evaluationController);


app.listen(8000, async () =>{
    await connect();
    console.log('listening on 8000 port');
})