import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password){
            token
            profile{
                _id
                name
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addProfile($name: String!, $email: String!, $password: String!){
        addProfile(name: $name, email: $email, password: $password){
            token
            profile{
                _id
                name
            }
        }
    }
`;

export const ADD_POST = gql`
    mutation addPost($text_content: String!, $author: String!){
        addPost(text_content: $text_content, author: $author){
            _id
            text_content
            author
        }
    }
`;

