const mongoose = require("mongoose");

// Post Schema

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 8,
        max: 40
    },
    description: {
        type: String,
        required: true,
        min: 10,
        max: 350
    },
    condition: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    price: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("Post", postSchema);