import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BreadCrumb from '../bread-crumb/BreadCrumb';
import OriginalPost from './OriginalPost';
import PostContent from './PostContent';
import './Post.css';

/**
 * Converts a flat list of posts into a nested tree structure.
 * Each post gets a `children` array.
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

        result.push({
            ...post,
            depth,
            threadRootId: rootId,
            visibleIndex: counters[rootId] // position within this subthread
        });

        // Recurse into children
        if (post.children?.length > 0) {
            flattenPosts(
                post.children,
                depth + 1,
                result,
                rootId,
                counters
            );
        }
    });

    return result;
}

function Posts() {
    const { boardId, threadId } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    /**
     * Tracks which subthreads have been expanded by the user.
     * Example:
     * {
     *   123: true,
     *   456: true
     * }
     */
    const [expandedThreads, setExpandedThreads] = useState({});

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

    // First item = original post, rest = replies
    const [thread, ...replies] = data;

    const boardTitle = thread?.board_name;
    const threadTitle = thread?.post_title;

    // Step 1: Build nested structure
    const nestedReplies = buildPostTree(replies);

    // Step 2: Flatten while tracking subthread positions
    const flatPosts = flattenPosts(nestedReplies);

    /**
     * Handles navigation to reply screen
     */
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

            {/* =========================
               ORIGINAL POST (OP)
            ========================= */}
            {thread && (
                <OriginalPost
                    thread={thread}
                    onReply={(post) => handleReplyClick(post, true)}
                />
            )}

            {/* =========================
               REPLIES (FLATTENED LIST)
            ========================= */}
            <div className="replies">
                {flatPosts.map(post => {
                    const effectiveDepth = Math.min(post.depth, 8);
                    const isFlattened = post.depth > 8;

                    const isExpanded = expandedThreads[post.threadRootId];

                    /**
                     * Hide posts beyond the first 8 in a subthread
                     * unless the user has expanded it
                     */
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
                            className={`post-wrapper depth-${effectiveDepth} ${
                                isFlattened ? 'flattened' : ''
                            }`}
                        >
                            <PostContent
                                post={post}
                                headingLevel={4}
                                onReply={(p) => handleReplyClick(p, false)}
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

