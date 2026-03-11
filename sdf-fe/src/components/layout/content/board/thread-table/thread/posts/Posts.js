import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import BreadCrumb from '../../../../bread-crumb/BreadCrumb';
import OriginalPost from './OriginalPost';
import Post from './Post';
import './Post.css';

/**
 * JavaScript Spread Operator (`...object`)
 *
 * The spread operator copies all enumerable properties from one object
 * into a new object.
 *
 * Example:
 *   const newObj = { ...oldObj };
 *
 * This creates a shallow copy of `oldObj`.
 *
 * In this file we use it to:
 *   - Preserve all original post properties
 *   - Avoid mutating backend data
 *   - Add a new `children` property for nesting
 */


/**
 * Converts a flat list of posts into a nested tree structure.
 * Each post receives a `children` array.
 */
function buildPostTree(postsArray) {
    const map = {};   // post_id → post object lookup
    const roots = []; // top-level replies (parent_id === 0)

    // First pass: create lookup map and initialise children arrays
    postsArray.forEach(post => {
        map[post.post_id] = {
            ...post,       // See spread operator explanation above
            children: []   // New property to hold nested replies
        };
    });

    // Second pass: attach each post to its parent
    postsArray.forEach(post => {
        if (post.parent_id === 0) {
            roots.push(map[post.post_id]);
        } else if (map[post.parent_id]) {
            map[post.parent_id].children.push(map[post.post_id]);
        }
    });

    return roots;
}

function Posts() {

    // Build Breadcrumb
    const location = useLocation();
    const boardTitle = location.state?.boardTitle;
    const threadTitle = location.state?.threadTitle;

    const { boardId, threadId } = useParams();
    const [data, setData] = useState([]);

    // Fetch thread data when threadId changes
    useEffect(() => {
        fetch(`http://localhost:5000/api/thread/posts/${threadId}`)
            .then(res => res.json())
            .then(setData)
            .catch(err => console.error("Failed to fetch posts:", err));
    }, [threadId]);

    // If there are no posts in reposnse
    if (!data.length) {
        return (
            <div className="post-table">
                <p>No posts available.</p>
            </div>
        );
    }

    // OP has post_id === null
    const thread = data.find(item => item.post_id === null);

    // Remove OP, sort replies chronologically, and nest them
    const replies = data
        .filter(item => item.post_id !== null)
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    const nestedReplies = buildPostTree(replies);

    return (
       
        <div className="post-table">
        <BreadCrumb
            boardId={boardId}            
            boardTitle={boardTitle}
            threadTitle={threadTitle}
        />
        
            {thread && <OriginalPost thread={thread} />}

            <div className="replies">
                {nestedReplies.map(post => (
                    <Post key={post.post_id} post={post} depth={1} />
                ))}
            </div>
        </div>
        
    );
}

export default Posts;