const express = require('express');

const app = express();

app.use(express.json());

const connect = require('./configs/db');

const sectionController = require('./controllers/section.controller');
const authorController = require('./controllers/author.controller');
const bookController = require('./controllers/book.controller');
const checkedOutController = require('./controllers/checkedOut.controller');

app.use('/sections', sectionController);
app.use('/authors', authorController);
app.use('/books', bookController);
app.use('/checkedOuts', checkedOutController);

git 
app.listen(9000, async () => {
    await connect();
    console.log('listening on port 9000');

})