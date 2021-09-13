const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        firstName: String,
        lastName: String
    },
    gender: String
})

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;