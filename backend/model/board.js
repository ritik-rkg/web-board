const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
    url: String,
    title: String,
    description: String,
})
const Board = mongoose.model("board", boardSchema);
module.exports = { Board, boardSchema };