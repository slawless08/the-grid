import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_POST } from '../../utils/mutations';
import { QUERY_POST } from '../../utils/queries';

import Auth from '../../utils/auth';

const PostForm = () => {
    const [text_content, setPostText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addPost, { error }] = useMutation(ADD_POST, {
        update(cache, { data: { addPost } }) {
            try {
                const { posts } = cache.readQuery({ query: QUERY_POST });

                cache.writeQuery({
                    query: QUERY_POST,
                    data: { posts: [addPost, ...posts] },
                });
            } catch (e) {
                console.error(e);
            }
        }
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addPost({
                variables: {
                    text_content,
                    author: Auth.getProfile().data.name,
                },
            });
            setPostText('');
        } catch (e) {
            console.error(e);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'text_content' && value.length <= 280) {
            setPostText(value);
            setCharacterCount(value.length);
        }
    };



    return (
        <div>
            <h3>Post here</h3>

            {Auth.loggedIn() ? (
                <>
                    <p>Character Count: {characterCount}/280</p>
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <textarea
                                name='text_content'
                                placeholder='Start writing here'
                                value={text_content}
                                onChange={handleChange}></textarea>
                        </div>

                        <div>
                            <button type='submit'>Add Post</button>
                        </div>
                        {error && (
                            <div>
                                {error.message}
                            </div>
                        )}
                    </form>
                </>
            ) : (
                <p>You need to be logged in to post. Please {' '}
                    <Link to='/login'>Login</Link> or <Link to='/signup'>Signup</Link>
                </p>
            )
            }
        </div>
    )
}

export default PostForm