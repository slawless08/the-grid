const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Profile {
        _id: ID
        name: String
        email: String
        password: String
    }

    type Post {
        _id: ID
        text_content: String
        author: String
    }

    type Auth {
    token: ID! 
    profile: Profile
    }

    type Query {
        profiles: [Profile]!
        profile(profileId: ID!): Profile
        posts: [Post]
        post(postId: ID!): Post
    }

    type Mutation{
        addProfile(name: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addPost(text_content: String!, author: String!): Post
        removePost(postId: ID!): Post
        updatePost(postId: ID!, postText: String!): Post
    }
`

module.exports = typeDefs;

/*


      
        
*/