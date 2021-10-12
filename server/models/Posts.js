const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    text_content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
    }
});