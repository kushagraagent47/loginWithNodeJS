const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    tag: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false
    },
    user:{
        type: String,
        ref:'users'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;