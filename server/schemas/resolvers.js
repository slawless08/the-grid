const { AuthenticationError } = require('apollo-server-express');
const { Profile } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        profiles: async () => {
            return Profile.find();
        },

        profile: async (parent, { profileId }) => {
            return Profile.findOne({ _id: profileId });
        },
    },

    Mutation: {
        addProfile: async (parent, { name, email, password }) => {
            const profile = await Profile.create({ name, email, password });
            const token = signToken(profile);

            return { token, profile };
        },

        login: async (parent, {email, password }) => {
            const profile = await Profile.findOne({ email });

            if(!profile){
                throw new AuthenticationError('No profile found with those credentials');
            }

            const correctPw = await profile.isCorrectPassword(password);

            if(!correctPw){
                throw new AuthenticationError('No profile found with those credentials');
            }

            const token = signToken(profile);
            return { token, profile };
        },
        // add remove profile?

        // add other mutations later for blogs, groups, etc.
    },
};

module.exports = resolvers;