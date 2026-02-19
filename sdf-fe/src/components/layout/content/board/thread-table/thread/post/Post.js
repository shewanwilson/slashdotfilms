import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Post.css';

function Post() {
    const { threadId } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/thread/posts/${threadId}`)
            .then(res => res.json())
            .then(json => setData(json))
            .catch(err => console.error("Failed to fetch posts:", err));
    }, [threadId]);

    if (data.length === 0) {
        return <div className="post-table"><p>No posts available.</p></div>;
    }

    // Separate thread (OP) from posts
    const thread = data.find(item => item.post_id === null);
    const posts = data
        .filter(item => item.post_id !== null)
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    // Build nested structure
    const buildTree = (postsArray) => {
        const map = {};
        const roots = [];

        postsArray.forEach(post => {
            map[post.post_id] = { ...post, children: [] };
        });

        postsArray.forEach(post => {
            if (post.parent_id === 0) {
                roots.push(map[post.post_id]);
            } else if (map[post.parent_id]) {
                map[post.parent_id].children.push(map[post.post_id]);
            }
        });

        return roots;
    };

    const nestedPosts = buildTree(posts);

    return (
        <div className="post-table">

            {/* THREAD OP */}
            {thread && (
                <div className="post op">
                    <div className="post-title">
                        <h3>{thread.post_title}</h3>
                    </div>
                        <div className="post-meta">
                        <span className="username">
                            User {thread.post_author_id}
                        </span>

                        <button
                            onClick={() =>
                                console.log(`Reply to post ${thread.post_id}`)
                            }
                        >
                            Reply
                        </button>
                    </div>

                    <div className="post-body">
                        <p>{thread.post_body}</p>
                    </div>
                </div>
            )}

            {/* REPLIES */}
            <div className="replies">
                {nestedPosts.map(post => (
                    <PostItem key={post.post_id} post={post} depth={0} />
                ))}
            </div>

        </div>
    );
}

/* Recursive component */
function PostItem({ post, depth }) {
    return (
        <div
            className="post-wrapper"
            style={{ marginLeft: depth * 24 }}
        >
            {/* Actual card */}
            <div className="post reply">
                {post.post_title && (
                    <div className="post-title">
                        <h4>{post.post_title}</h4>
                    </div>
                )}

                <div className="post-meta">
                    <span className="username">
                        User {post.post_author_id}
                    </span>

                    <button
                        onClick={() =>
                            console.log(`Reply to post ${post.post_id}`)
                        }
                    >
                        Reply
                    </button>
                </div>

                <div className="post-body">
                    <p>{post.post_body}</p>
                </div>
            </div>

            {/* Children rendered OUTSIDE the card */}
            {post.children.length > 0 && (
                <div className="post-children">
                    {post.children.map(child => (
                        <PostItem
                            key={child.post_id}
                            post={child}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}


export default Post;
