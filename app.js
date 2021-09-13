const express = require("express");
const logger = require("morgan");
const mongoose = require('mongoose');

const index = require("./routes/index");
const books = require("./routes/books");
const authors = require("./routes/authors");

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use("/", index);
mongoose.connect("mongodb://localhost/mongoose_basics", async function(err) {
    if (err) throw err;

    app.use("/books", books);
    app.use("/authors", authors);
    console.log("Successfully connected");

    // const books = await Book.find({
    //     title: /mvc/i
    // })
    //     .sort("-created")
    //     .limit(5)
    //     .exec();
    // console.log("Found books with `MVC` in the name", books);
});
app.use("/books", books);

module.exports = app;
