const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },

    category: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },

    content: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 1000
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]

});

module.exports = mongoose.model("Post", postSchema);