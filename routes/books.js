const express = require("express");
const Book = require("../models/books");
const mongoose = require("mongoose");
const router = express.Router();

/* GET books listing. */
router.get("/", async (req, res, next) => {
  try {
    const books = await Book.find({});
    res.json({ message: "respond with all books" });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async(req, res, next) => {
  try {
    const books = await Book.findById(req.params.id);
    return res.status(200).json(books);
  } catch (error) {
    res.send("Cannot find the book")
    return res.status(404).end();
  }
});

router.post("/", (req, res, next) => {
  const mvcBook = new Book({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    author: req.body.author,
    ratings: [
      {
        summary: req.body.summary
      }
    ]
  });

  mvcBook.save();

  console.log("Book successfully saved.");
  res.json({ message: `create new book using data from ${req.body}` });
});

router.put("/:id", async (req, res, next) => {
  try {
    const bookData = await Book.findByIdAndUpdate(req.params.id, req.body);
    bookData.save();
    res.json({ message: `update book with id ${req.params.id}` });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async(req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) res.status(404).send("No item found");
    res.json({ message: `delete book with id ${req.params.id}` });
  } catch (error) {
    res.status(500).send(error);
  }

});

module.exports = router;
