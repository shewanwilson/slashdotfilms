import React, { useState } from "react";
import "./NewThread.css";

function NewThread() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      setError("Title and message are required.");
      return;
    }

    setError("");

    // FRONT-END ONLY for now
    const newThread = {
      title,
      body,
      createdAt: new Date().toISOString(),
    };

    console.log("New thread submitted:", newThread);

    // reset form
    setTitle("");
    setBody("");
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter thread title"
        />

        <label htmlFor="thread-body">Message</label>
        <textarea
          id="thread-body"
          value={body}
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
