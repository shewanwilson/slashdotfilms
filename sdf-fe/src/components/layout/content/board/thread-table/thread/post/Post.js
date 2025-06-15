import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Post.css';

function Post() {
    const { threadId } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/thread/posts/${threadId}`)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error("Failed to fetch posts:", err));
    }, [threadId]);

    return (
        <div className="post-table">
            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                posts.map((post, index) => (
                    <div key={index} className="post">
                        <div className="post-title">
                            <h4>{post.post_title}</h4>
                        </div>

                        <div className="post-meta">
                            <div className="user-info">
                                <img
                                    src={post.avatar_url || 'https://placehold.co/40x40?text=U&font=roboto'}
                                    alt={`${post.post_author}'s avatar`}
                                    className="avatar"
                                />

                                <span className="username">{post.post_author}</span>
                            </div>
                            <div className="reply-button">
                                <button onClick={() => console.log(`Reply to post ${post.post_id}`)}>
                                    Reply
                                </button>
                            </div>
                        </div>

                        <div className="post-body">
                            <p>{post.post_body}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Post;
