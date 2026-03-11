/**
 * Displays the original thread starter post (OP).
 *
 * This is separated from replies because:
 * - It has different semantic meaning
 * - It may have different styling
 * - It is not part of the nested reply tree
 */
function OriginalPost({ thread }) {
    return (
        <div className="post op">
            <div className="post-title">
                <h3>{thread.post_title}</h3>
            </div>

            <div className="post-meta">
                <span className="username">
                    User {thread.post_author_id}
                </span>

                <button onClick={() => console.log(`Reply to ${thread.post_id}`)}>
                    Reply
                </button>
            </div>

            <div className="post-body">
                <p>{thread.post_body}</p>
            </div>
        </div>
    );
}

export default OriginalPost;