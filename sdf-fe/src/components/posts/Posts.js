import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Post from '../posts/Post.model.tsx';
import BreadCrumb from '../bread-crumb/BreadCrumb';
import PostContent from './PostContent';
import './Post.css';

/**
 * Converts a flat list of posts into a nested tree structure.
 * Each post gets a `children` array.
 */
function buildPostTree(postsArray) {
    const mapOfPosts = {};
    const treeRoots = [];

    // Convert each post row from db into Post object
    // Store Post objects in map mapOfPosts
    postsArray.forEach(row => {
        const post = new Post(row);
        mapOfPosts[post.post_id] = post;
    });

    Object.values(mapOfPosts).forEach(post => {
        // if post has a parent_id that exists in this array
        if (mapOfPosts[post.parent_id]) {
            // add it as a child of that post
            mapOfPosts[post.parent_id].addChild(post);
        } else {
            treeRoots.push(post);
        }
    });

    return treeRoots;
}

/**
 *  FLATTEN WITH SUBTHREAD TRACKING
 *
 * This does 3 things:
 * 1. Flattens nested replies into a linear list (for simple rendering)
 * 2. Tracks depth (for indentation)
 * 3. Tracks how many replies exist within a subthread
 *
 * Each "subthread" starts at a top-level reply (child of OP)
 */
function flattenPosts(posts, depth = 1, result = [], threadRootId = null, counters = {}) {
    posts.forEach(post => {
        // If we don't yet have a root, this post becomes the root of a subthread
        const rootId = threadRootId || post.post_id;

        // Initialise counter for this subthread
        if (!counters[rootId]) counters[rootId] = 0;

        // Increment how many posts we've seen in this subthread
        counters[rootId]++;

        post.depth = depth;
        post.threadRootId = rootId;
        post.visibleIndex = counters[rootId];

        result.push(post);

        // Recurse into children
        if (post.children?.length > 0) {
            flattenPosts(post.children, depth + 1, result, rootId, counters);
        }
    });

    return result;
}

function Posts() {
    const { boardId, threadId } = useParams();
    const [data, setData] = useState([]);

    /* Handles navigation to reply screen in submit function */
    const navigate = useNavigate();


    /* Tracks which subthreads have been expanded by the user. */
    const [expandedThreads, setExpandedThreads] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/api/board/${boardId}/thread/${threadId}`, {
            credentials: "include"
        })
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

    console.log("RAW DATA:", data);
    // First item = original post, rest = replies
    const [threadOp, ...replies] = data;
    console.log("REPLIES:", replies);
    // Set board title FROM board table 
    const boardTitle = threadOp.board_name;

    // convert OP to Post model instance
    const originalPost = new Post(threadOp)
    // Set threadTitle FROM thread table 
    const threadTitle = originalPost.post_title;

    // Step 1: Build nested structure
    const nestedReplies = buildPostTree(replies);
    console.log("NESTED:", nestedReplies);

    // Step 2: Flatten while tracking subthread positions
    const flatPosts = flattenPosts(nestedReplies);
    console.log("FLAT:", flatPosts);
    /* Handles navigation to reply screen */
    const handleReplyClick = (post) => {
        navigate(`/board/${boardId}/thread/${threadId}/reply/${post.post_id}`, {
            state:
                { post, boardTitle, threadTitle }
        });
    };

    const handleEditClick = (post) => {
        navigate(`/board/${boardId}/thread/${threadId}/reply/${post.post_id}`, {
            state:
                { post, boardTitle, threadTitle, editPost: true }
        });
    }

    return (
        <div className="post-table">
            <BreadCrumb
                boardId={boardId}
                boardTitle={boardTitle}
                threadTitle={threadTitle}
            />

            {/* =========================
               ORIGINAL POST (OP)
            ========================= */}
            {originalPost && (
                <div className="post-wrapper depth-0">
                    <PostContent
                        post={originalPost}
                        headingLevel={3}
                        onReply={handleReplyClick}
                        onEdit={handleEditClick}
                        className="op"
                    />
                </div>
            )}

            {/* =========================
               REPLIES (FLATTENED LIST)
            ========================= */}
            <div className="replies">
                {flatPosts.map(post => {
                    const effectiveDepth = Math.min(post.depth, 8);
                    const isFlattened = post.depth > 8;

                    const isExpanded = expandedThreads[post.threadRootId];

                    /* Hide posts beyond the first 8 in a subthread unless the user has expanded it */
                    const shouldHide =
                        post.visibleIndex > 8 && !isExpanded;

                    // If hidden, only render ONE "expand" trigger
                    if (shouldHide) {
                        if (post.visibleIndex === 9) {
                            return (
                                <div
                                    key={`expand-${post.threadRootId}`}
                                    className="post-wrapper depth-8 collapsed-link"
                                >
                                    <button
                                        className="expand-thread-btn"
                                        onClick={() =>
                                            setExpandedThreads(prev => ({
                                                ...prev,
                                                [post.threadRootId]: true
                                            }))
                                        }
                                    >
                                        Continue this thread →
                                    </button>
                                </div>
                            );
                        }

                        return null;
                    }

                    /**
                     * Normal visible post rendering
                     */
                    return (
                        <div
                            key={post.post_id}
                            className={`post-wrapper depth-${effectiveDepth} ${isFlattened ? 'flattened' : ''
                                }`}
                        >
                            <PostContent
                                post={post}
                                headingLevel={4}
                                onReply={handleReplyClick}
                                onEdit={handleEditClick}
                                className="reply"
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Posts;

