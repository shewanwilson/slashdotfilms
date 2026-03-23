import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BreadCrumb from '../bread-crumb/BreadCrumb';
import OriginalPost from './OriginalPost';
import Post from './Post';
import './Post.css';

/**
 * Converts a flat list of posts into a nested tree structure.
 * Each post receives a `children` array.
 */
function buildPostTree(postsArray) {
    const map = {};
    const roots = [];

    postsArray.forEach(post => {
        map[post.post_id] = {
            ...post,
            children: []
        };
    });

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
    const { boardId, threadId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/board/${boardId}/thread/${threadId}`)
            .then(res => res.json())
            .then(setData)
            .catch(err => console.error('Failed to fetch posts:', err));
    }, [boardId, threadId]);

    if (!data.length) {
        return (
            <div className="post-table">
                <p>No posts available.</p>
            </div>
        );
    }

    const [thread, ...replies] = data;
    const boardTitle = thread?.board_name;
    const threadTitle = thread?.post_title;
    const nestedReplies = buildPostTree(replies);

    const handleReplyClick = (post, isOriginalPost = false) => {
        navigate(`/board/${boardId}/thread/${threadId}/reply/${post.post_id}`, {
            state: {
                post,
                boardTitle,
                threadTitle,
                isOriginalPost
            }
        });
    };

    return (
        <div className="post-table">
            <BreadCrumb
                boardId={boardId}
                boardTitle={boardTitle}
                threadTitle={threadTitle}
            />

            {thread && (
                <OriginalPost
                    thread={thread}
                    onReply={(post) => handleReplyClick(post, true)}
                />
            )}

            <div className="replies">
                {nestedReplies.map(post => (
                    <Post
                        key={post.post_id}
                        post={post}
                        depth={1}
                        onReply={(post) => handleReplyClick(post, false)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Posts;