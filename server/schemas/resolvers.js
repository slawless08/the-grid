const { AuthenticationError } = require('apollo-server-express');
const { Profile, Group, Post } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        profiles: async () => {
            return Profile.find();
        },

        profile: async (parent, { profileId }) => {
            return Profile.findOne({ _id: profileId });
        },
        posts: async () => {
            return Post.find();
        },
        post: async (parent, { postId }) => {
            return Post.findOne({ _id: postId });
        },
    },

    Mutation: {
        addProfile: async (parent, { name, email, password }) => {
            const profile = await Profile.create({ name, email, password });
            const token = signToken(profile);

            return { token, profile };
        },

        login: async (parent, { email, password }) => {
            const profile = await Profile.findOne({ email });

            if (!profile) {
                throw new AuthenticationError('No profile found with those credentials');
            }

            const correctPw = await profile.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('No profile found with those credentials');
            }

            const token = signToken(profile);
            return { token, profile };
        },
        // add remove profile?

        // add other mutations later for blogs, groups, etc.

        addPost: async (parent, { text_content, author }) => {
            const post = await Post.create({ text_content, author });

            /*await Group.findOneAndUpdate(
                { ** need a way to filter to find the group? ** }
                { $addToSet: { posts: post._id }}
                );*/

            return post;
        },

        removePost: async (parent, { postId }) => {
            return Post.findOneAndDelete({ _id: postId });
        },
        updatePost: async (parent, { postId, postText }) => {
            return Post.findOneAndUpdate(
                { _id: postId },
                { text_content: postText },
                { new: true },
            );
        },
    },
};

module.exports = resolvers;