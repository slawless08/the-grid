import { gql } from '@apollo/client';

export const QUERY_POST = gql`
    query getPosts{
        posts {
            _id
            text_content
            author
        }
    }
`;

