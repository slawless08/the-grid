const db = require('../config/connection');
const { Profile, Post, Group } = require('../models');
const profileSeeds = require('./profileSeeds.json');
const postSeeds = require('./postSeeds.json');
const groupSeeds = require('./groupSeeds.json');

db.once('open', async () => {
    try {
        await Profile.deleteMany({});
        await Profile.create(profileSeeds);
        await Post.deleteMany({});
        await Post.create(postSeeds);
        await Group.deleteMany({});
        await Group.create(groupSeeds);

        console.log('Profiles seeded');
        process.exit(0);
    } catch (err) {
        throw err;
    }
});