import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import BreadCrumb from '../bread-crumb/BreadCrumb';
import PostContent from './PostContent';
import './Post.css';

function PostReply() {
    const { boardId, threadId, postId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const post = location.state?.post;
    const boardTitle = location.state?.boardTitle;
    const threadTitle = location.state?.threadTitle;

    const [replyTitle, setReplyTitle] = useState('');
    const [replyBody, setReplyBody] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isOriginalPost = location.state?.isOriginalPost;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            parent_id: isOriginalPost ? 0 : Number(postId),
            post_title: replyTitle,
            post_body: replyBody
        };
        console.log('Submitting reply payload:', payload);

        try {
            
            const res = await fetch(`http://localhost:5000/api/thread/${threadId}/reply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                throw new Error('Failed to submit reply');
            }

            navigate(`/board/${boardId}/thread/${threadId}`);
        } catch (err) {
            console.error('Failed to submit reply:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!post) {
        return (
            <div className="post-table">
                <p>Reply target could not be loaded.</p>
            </div>
        );
    }

    return (
        <div className="post-table">
            <BreadCrumb
                boardId={boardId}
                boardTitle={boardTitle}
                threadTitle={threadTitle}
            />

            <div className="reply-target">
                <h3>Replying to</h3>
                <PostContent
                    post={post}
                    headingLevel={4}
                    className="reply"
                />
            </div>

            <form className="reply-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="reply-title">Reply title</label>
                    <input
                        id="reply-title"
                        type="text"
                        value={replyTitle}
                        onChange={(e) => setReplyTitle(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="reply-body">Reply body</label>
                    <textarea
                        id="reply-body"
                        value={replyBody}
                        onChange={(e) => setReplyBody(e.target.value)}
                        rows="8"
                        required
                    />
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Posting...' : 'Post Reply'}
                </button>
            </form>
        </div>
    );
}

export default PostReply;