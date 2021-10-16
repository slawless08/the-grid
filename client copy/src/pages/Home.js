import React from 'react';
import { useQuery } from '@apollo/client';

import Posts from '../components/Posts';
import PostForm from '../components/PostForm';

import { QUERY_POST } from '../utils/queries';
import { QueryDocumentKeys } from 'graphql/language/visitor';

const Home = () => {
const { data } = useQuery(QUERY_POST);
const posts = data?.posts || [];

    return (
        <main>
            <div>
                <div>
                    <PostForm/>
                </div>
                <div>
                    <Posts
                    posts={posts}
                />
                </div>
            </div>
        </main>
    )
}

export default Home