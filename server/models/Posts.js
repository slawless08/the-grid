const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    text_content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    }
});

const Post = model('Post', postSchema);

module.exports = Post;