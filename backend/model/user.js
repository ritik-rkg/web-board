const mongoose = require("mongoose");
const { boardSchema } = require("./board");


const userSchema = new mongoose.Schema({
    name: String,
    firebase_uuid: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },  
    date: {
        type: Date,
        default: Date.now
    },
    collections: {
        type: [boardSchema],
        default: []
    },
});
const User = mongoose.model("user", userSchema);
module.exports = User;