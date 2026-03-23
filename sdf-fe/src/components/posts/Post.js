import PostContent from './PostContent';

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
function Post({ post, depth, onReply }) {
    return (
        <div
            className="post-wrapper"
            style={{ marginLeft: depth * 24 }}
        >
            <PostContent
                post={post}
                headingLevel={4}
                onReply={onReply}
                className="reply"
            />

            {post.children?.length > 0 && (
                <div className="post-children">
                    {post.children.map(child => (
                        <Post
                            key={child.post_id}
                            post={child}
                            depth={depth + 1}
                            onReply={onReply}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Post;