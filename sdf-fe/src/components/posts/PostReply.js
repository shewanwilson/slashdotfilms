import React, { useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import BreadCrumb from '../bread-crumb/BreadCrumb';
import RichTextButtons from '../rich-text-buttons/RichTextButtons';
import PostContent from './PostContent';
import './PostReply.css';

function PostReply() {
    const { boardId, threadId, postId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const editPost = location.state?.editPost || false;
    const post = location.state?.post;
    const boardTitle = location.state?.boardTitle;
    const threadTitle = location.state?.threadTitle;

    // Use editPost state to fork between posting a new reply and editing a current one
    const [replyTitle, setReplyTitle] = useState(
        editPost ? post.post_title : "RE: " + threadTitle
    );

    const [replyBody, setReplyBody] = useState(
        editPost ? post.post_body : ''
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const textareaRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let res;

            if (editPost) {
                res = await fetch(
                    `http://localhost:5000/api/post/${post.post_id}/edit`,
                    {
                        method: 'PUT',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            post_title: replyTitle,
                            post_body: replyBody
                        })
                    }
                );
            } else {
                const payload = {
                    parent_id: Number(postId),
                    post_title: replyTitle,
                    post_body: replyBody
                };

                res = await fetch(
                    `http://localhost:5000/api/thread/${threadId}/reply`,
                    {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    }
                );
            }

            if (!res.ok) {
                throw new Error('Failed to submit');
            }

            navigate(`/board/${boardId}/thread/${threadId}`);

        } catch (err) {
            console.error('Submit failed:', err);
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

            {/* If user is editing then don't show post being replied to */}
            {!editPost && (
                <div className="reply-target">
                    <h3>Replying to</h3>
                    <PostContent
                        post={post}
                        headingLevel={4}
                        className="reply"
                    />
                </div>
            )}

            <form className="reply-form" onSubmit={handleSubmit}>

                <label htmlFor="reply-title">Reply title</label>
                <input
                    id="reply-title"
                    type="text"
                    value={replyTitle}
                    onChange={(e) => setReplyTitle(e.target.value)}
                />



                <label htmlFor="reply-body">Reply body</label>
                <RichTextButtons textareaRef={textareaRef} setBody={setReplyBody} />
                <textarea
                    id="reply-body"
                    value={replyBody}
                    ref={textareaRef}
                    onChange={(e) => setReplyBody(e.target.value)}
                    rows="8"
                    required
                    placeholder="Write your post..."

                />

                <div className="reply-actions">
                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting
                            ? (editPost ? 'Saving...' : 'Posting...')
                            : (editPost ? 'Post Edit' : 'Post Reply')}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PostReply;