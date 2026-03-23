function PostContent({ post, headingLevel = 4, onReply, className = '' }) {
    const HeadingTag = `h${headingLevel}`;

    return (
        <div className={`post ${className}`}>
            {post.post_title && (
                <div className="post-title">
                    <HeadingTag>{post.post_title}</HeadingTag>
                </div>
            )}

            <div className="post-meta">
                <span className="username">
                    User {post.post_author_id}
                </span>

                {onReply && (
                    <button onClick={() => onReply(post)}>
                        Reply
                    </button>
                )}
            </div>

            <div className="post-body">
                <p>{post.post_body}</p>
            </div>
        </div>
    );
}

export default PostContent;