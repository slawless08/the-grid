const { Schema, model } = require('mongoose');
const Group = require('./Group');
const profileSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    groups: [Group.schema]
});

const Profile = model('Profile', profileSchema);

module.exports = Profile;