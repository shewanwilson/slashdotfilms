/**
 * Renders a single reply.
 *
 * This component is recursive — meaning it renders itself
 * for any nested child replies.
 *
 * Props:
 * - post  : the current post object
 * - depth : how deeply nested this post is
 *
 * `depth` is used to visually indent replies.
 */
function Post({ post, depth }) {
    return (
        <div
            className="post-wrapper"
            style={{ marginLeft: depth * 24 }} 
            // Indent increases per nesting level
        >
            <div className="post reply">

                {/* Some replies may not have titles */}
                {post.post_title && (
                    <div className="post-title">
                        <h4>{post.post_title}</h4>
                    </div>
                )}

                <div className="post-meta">
                    <span className="username">
                        User {post.post_author_id}
                    </span>

                    <button onClick={() => console.log(`Reply to ${post.post_id}`)}>
                        Reply
                    </button>
                </div>

                <div className="post-body">
                    <p>{post.post_body}</p>
                </div>
            </div>

            {/* 
               Recursively render child replies.
               This allows unlimited nesting depth.
            */}
            {post.children.length > 0 && (
                <div className="post-children">
                    {post.children.map(child => (
                        <Post
                            key={child.post_id}
                            post={child}
                            depth={depth + 1} // increase indentation level
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Post;