import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LastPostTime from "../LastPostTime";

function PostContent({ post, headingLevel = 4, onReply, onEdit}) {
    const HeadingTag = `h${headingLevel}`;
    const date = new Date(post.created_at);
    
    // Mark post as OP if parent_id is 0
    const isOp = post.parent_id === 0;    

    // TODO: Remove this and add it to Post.model
    const datestamp =
        date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        }) +
        " " +
        date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });

    return (
        <div className={`post ${isOp ? 'op' : ''}`}>

            {/* HEADER */}
            <div className="post-header">

                {/* TITLE ROW */}
                {post.post_title && (
                    <div className="post-title">
                        <span className="post-timestamp">
                            <LastPostTime timeOfLastPost={post.created_at} />
                        </span>

                        <HeadingTag>{post.post_title}</HeadingTag>
                                           
                    </div>
                )}

                {/* META + ACTIONS */}
                <div className="post-meta">
                    <div className="post-meta-left">
                        <span className="username">{post.username}</span>

                        <span className="posting-time-stamp">
                            {datestamp}
                        </span>
                    </div>

                    {post.can_edit && (
                        <button
                            className="edit-post-btn"
                            onClick={() => onEdit(post)}
                        >
                            Edit
                        </button>
                    )}

                    {onReply && (
                        <button
                            className="reply-btn"
                            onClick={() => onReply(post)}
                        >
                            Reply
                        </button>
                    )}
                </div>
            </div>

            {/* BODY */}
            <div className="post-body">                
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {post.post_body}
                </ReactMarkdown>
            </div>
        </div>
    );
}

export default PostContent;