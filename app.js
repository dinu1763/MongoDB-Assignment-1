const express = require("express");
const app = express();

const logger = (req, res, next) =>{
    req.name = "Dinesh Kumar";
    next();
};

app.use(logger);

const books = require("./books.json");

app.get("/", (req, res) =>{
    
    let books_details = [{ api_requested_by: req.name }, ...books, res.body];
    res.send(books_details);
});

app.post("/books", (req, res) =>{
    const new_books = [...books, req.body];
    res.send(new_books);
});

app.patch("/books/:author", (req, res)=>{
    const newBooks = books.map((book) =>{
        if(req.params.author == book.author){
            if(req?.body?.book_name) book.book_name = req.body.book_name;
            if(req?.body?.pages) book.pages = req.body.pages;
            if(req?.body?.published_year) book.published_year = req.body.published_year;
            if(req?.body?.author) book.author = req.body.author;
        }
        return book;
    });
    res.send(newBooks);
});

app.delete('/books/:author', (req, res) =>{
    const newBooks = books.filter((book) => book.author !== req.params.author);
    res.send(newBooks);
});

app.listen("8000", ()=>{
    console.log("Listening to Port 8000");
})