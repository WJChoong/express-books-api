const express = require("express");
const Author = require("../models/authors");
const Book = require("../models/books");
const mongoose = require("mongoose");
const router = express.Router();

/* GET books listing. */
router.get("/", async (req, res, next) => {
    try {
        const authors = await Author.find({});
        res.json({ message: "respond data with all authors" });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/:id", async(req, res, next) => {
    try {
        const books = await Book.find({author: req.params.id});
        return res.status(200).json(books);
    } catch (error) {
        res.send("Cannot find the author")
        return res.status(404).end();
    }
});

router.post("/", async (req, res, next) => {
    const newAuthor = await new Author({
        _id: new mongoose.Types.ObjectId(),
        name: {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        },
        gender: req.body.gender
    });

    newAuthor.save();

    console.log("Author successfully saved.");
    res.json({ message: `create new author using data from ${req.body}` });
});

// Have some errors
// router.put("/:id", async (req, res, next) => {
//     try {
//         const authorData = await Author.findByIdAndUpdate(req.params.id, req.body);
//         authorData.save();
//         res.json({ message: `update book with id ${req.params.id}` });
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

router.delete("/:id", async(req, res, next) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);

        if (!author) res.status(404).send("No author found");
        res.json({ message: `delete author with id ${req.params.id}` });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;