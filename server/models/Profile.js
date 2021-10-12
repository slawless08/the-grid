const { Schema, model } = require('mongoose');
const Group = require('./Group');
const bcrypt = require('bcrypt');


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

profileSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {

        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    };

    next();
});

profileSchema.methods.isCorrectPassword = async function (password){
    return bcrypt.compare(password, this.password);
};

const Profile = model('Profile', profileSchema);

module.exports = Profile;