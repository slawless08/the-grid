const { Schema, model } = require('mongoose');

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "Profile",
        },
    ],
});

const Group = model('Group', groupSchema);

module.exports = Group;