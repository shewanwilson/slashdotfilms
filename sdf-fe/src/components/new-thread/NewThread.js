import React, { useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PostContent from "../posts/PostContent";
import RichTextButtons from '../rich-text-buttons/RichTextButtons';
import "./NewThread.css";

function NewThread() {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const [thread_title, setTitle] = useState("");
  const [op_body, setBody] = useState("");
  const [error, setError] = useState("");

  const textareaRef = useRef();

  const [showPreview, setShowPreview] = useState(false);

  const previewPost = {
    post_title: thread_title,
    post_body: op_body,
    username: "You",
    created_at: new Date().toISOString(),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!thread_title.trim() || !op_body.trim()) {
      setError("Title and message are required.");
      return;
    }

    setError("");

    try {
      const res = await fetch(
        `http://localhost:5000/api/thread/new/${boardId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({ thread_title, op_body })
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create thread");
      }

      const data = await res.json();
      navigate(`/board/${boardId}/thread/${data.thread_id}`);

    } catch (err) {
      console.error("Error creating thread:", err);
      setError(err.message);
    }
  };

  return (
    <div className="new-thread">
      <h2 data-testid="new-thread-heading" className="new-thread-title">Create New Thread</h2>

      {showPreview && (
        <PostContent
          post={previewPost}
          headingLevel={4}
          className="preview-post"
        />
      )}


      <form className="new-thread-form" onSubmit={handleSubmit}>
        {error && <div className="form-error">{error}</div>}

        <label htmlFor="thread-title">Title</label>
        <input
          data-testid="new-thread-title"
          id="thread-title"
          type="text"
          value={thread_title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter thread title"
        />

        <label htmlFor="thread-body">Message</label>
        <RichTextButtons textareaRef={textareaRef} setBody={setBody}/>
        <textarea
          data-testid="new-thread-body"
          ref={textareaRef}
          id="thread-body"
          value={op_body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your post..."
          rows={8}
        />

        <div className="new-thread-actions">
          <button data-testid="new-thread-preview-button" type="button" className="new-thread-btn" onClick={() => setShowPreview((prev) => !prev)}>
            Preview Post
          </button>
          <button data-testid="new-thread-submit-button" type="submit" className="new-thread-btn">
            Post Thread
          </button>
          
        </div>
      </form>
    </div>
  );
}

export default NewThread;
