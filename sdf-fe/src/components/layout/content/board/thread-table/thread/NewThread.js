import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./NewThread.css";

function NewThread() {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const [thread_title, setTitle] = useState("");
  const [op_body, setBody] = useState("");
  const [error, setError] = useState("");

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
      navigate(`/thread/posts/${data.thread_id}`);

    } catch (err) {
      console.error("Error creating thread:", err);
      setError(err.message);
    }
  };

  return (
    <div className="new-thread">
      <h2 className="new-thread-title">Create New Thread</h2>

      <form className="new-thread-form" onSubmit={handleSubmit}>
        {error && <div className="form-error">{error}</div>}

        <label htmlFor="thread-title">Title</label>
        <input
          id="thread-title"
          type="text"
          value={thread_title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter thread title"
        />

        <label htmlFor="thread-body">Message</label>
        <textarea
          id="thread-body"
          value={op_body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your post..."
          rows={8}
        />

        <div className="new-thread-actions">
          <button type="submit" className="submit-btn">
            Post Thread
          </button>
          
        </div>
      </form>
    </div>
  );
}

export default NewThread;
