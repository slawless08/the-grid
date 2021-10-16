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
                <div key={post._id} className="carb mb-3">
                    <h6 className="card-header p-2">
                        Posted by: {post.author}
                    </h6>
                    <div className="card-body p-2"><p>{post.text_content}</p></div>
                </div>
            ))
            }
        </div>
    )
}



export default Posts