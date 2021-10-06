const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
});

const Profile = model('Profile', profileSchema);

module.exports = Profile;