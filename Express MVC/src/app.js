const express = require('express');
const app = express();


app.use(express.json());

const connect = require('./configs/db');

app.listen(8000, async () =>{
    await connect();
    console.log('listening on 8000 port');
})