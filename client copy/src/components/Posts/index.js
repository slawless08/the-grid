import React from 'react';
import { Link } from 'react-router-dom';

const Posts = ({
    posts
}) => {
    if(!posts.length){
        return <h3>No Posts to display</h3>;
    }

    return(
        <div>
            <h3>POST</h3>
            {posts &&
            posts.map((post) => (
                <div key={post._id}>
                    <h4>
                        Created by: {post.author}
                    </h4>
                    <div><p>{post.text_content}</p></div>
                </div>
            ))
            }
        </div>
    )
}



export default Posts