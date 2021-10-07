const mongoose = require("mongoose");

// User Schema

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 3,
        max: 18,
        unique: true
    },
    email:{
        type: String,
        required: true,
        max: 30,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min: 6,
        max: 25
    },
    posts:{
        type: Array,
        default: []
    },
});

module.exports = mongoose.model("User", userSchema);